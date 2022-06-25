import React, { ChangeEvent, useEffect, useRef } from "react";
import { Progress as ProgressComponent } from "./progress";
import { v4 as uuidv4 } from "uuid";
import { ConvertSession } from "../convert-session";
import { gettext } from "../i18n";
import { useForceUpdate } from "./main";
import { WorkerError } from "../../share/messages";
import { ErrorMessage } from "./error-message";
import { directoryNameFromFileList } from "../../share/file-list-ext";
import {
  initialProgress,
  J2BConverterMetadata,
  Progress,
  ProgressReducer,
} from "../../share/progress";
import {
  ConvertMode,
  convertModeInputFileExtension,
  convertModeSupportsDirectoryInput,
} from "../mode";

type State = Progress & {
  id?: string;
  dl?: { id: string; filename: string };
  error?: WorkerError;
  startTime?: number;
  endTime?: number;
};

export const Convert: React.FC<{
  mode: ConvertMode;
  onFinish: () => void;
  onStart: () => void;
}> = ({ onFinish, onStart, mode }) => {
  const session = useRef<ConvertSession | null>(null);
  const forceUpdate = useForceUpdate();
  const state = useRef<State>({});
  const setState = (p: Partial<State>) => {
    state.current = { ...state.current, ...p };
    forceUpdate();
  };
  const updateProgress = (reducer: ProgressReducer) => {
    setState({ ...reducer(state.current) });
  };
  const onError = (error: WorkerError) => {
    setState({ error });
    onFinish();
  };
  const onFinishCalled = () => {
    setState({ endTime: Date.now() });
    onFinish();
  };
  const changeHandler = ({ file }: { file: boolean }) => {
    return (ev: ChangeEvent<HTMLInputElement>) => {
      const files = ev.target.files;
      const noFileSelectedError: WorkerError = {
        type: "Other",
        native: {
          message: "no file selected, or one or more files selected",
        },
      };
      if (!files) {
        setState({ error: noFileSelectedError });
        return;
      }
      let source: File | FileList;
      let filename: string;
      if (file) {
        if (!files || files.length !== 1) {
          setState({ error: noFileSelectedError });
          return;
        }
        const f = files.item(0);
        if (!f) {
          setState({ error: noFileSelectedError });
          return;
        }
        source = f;
        filename = f.name;
      } else {
        let numLevelDatFiles = 0;
        const dirname = directoryNameFromFileList(files);
        if (dirname === undefined) {
          setState({
            error: {
              type: "Other",
              native: { message: "can't read directory" },
            },
          });
          return;
        }
        for (let i = 0; i < files.length; i++) {
          const item = files.item(i);
          if (!item) {
            continue;
          }
          if (item.name === "level.dat") {
            numLevelDatFiles++;
          }
        }
        if (numLevelDatFiles === 0) {
          setState({ error: { type: "NoLevelDatFound", native: {} } });
          return;
        } else if (numLevelDatFiles > 1) {
          setState({ error: { type: "2OrMoreLevelDatFound", native: {} } });
          return;
        }
        source = files;
        filename = dirname;
      }
      const id = uuidv4();
      const meta = new J2BConverterMetadata(file);
      const s = new ConvertSession({
        id,
        mode,
        meta,
        file: source,
        filename,
        updateProgress,
        onFinish: onFinishCalled,
        onError,
      });
      session.current?.close();
      session.current = s;
      s.start();

      const progress = initialProgress(meta);
      setState({
        id,
        ...progress,
        startTime: Date.now(),
        endTime: undefined,
      });
      onStart();
    };
  };
  const inputDirectory = useRef<HTMLInputElement>(null);
  const inputFile = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputDirectory.current?.setAttribute("webkitdirectory", "");
    return () => {
      session.current?.close();
      session.current = null;
    };
  }, []);
  return (
    <>
      <div className="inputZip">
        {!session.current && (
          <>
            <div>{gettext("Select a world to convert")}</div>
            <div className="hFlex" style={{ marginTop: 20 }}>
              {convertModeSupportsDirectoryInput(mode) && (
                <label
                  className="roundButton inputLabel"
                  htmlFor="input_directory"
                >
                  {gettext("Select directory")}
                  <input
                    id={"input_directory"}
                    type={"file"}
                    onChange={changeHandler({ file: false })}
                    ref={inputDirectory}
                    disabled={state.current.id !== undefined}
                  />
                </label>
              )}
              <label className="roundButton inputLabel" htmlFor="input_zip">
                {gettext("Select archive")}
                <input
                  id={"input_zip"}
                  type={"file"}
                  onChange={changeHandler({ file: true })}
                  accept={convertModeInputFileExtension(mode)}
                  ref={inputFile}
                  disabled={state.current.id !== undefined}
                />
              </label>
            </div>
          </>
        )}
      </div>
      {session.current && (
        <div className="vFlex">
          <div>{gettext("Selected file: ") + session.current.filename}</div>
          {state.current.endTime === undefined && (
            <div>{gettext("Converting...")}</div>
          )}
          {state.current.startTime && state.current.endTime && (
            <div>
              {gettext("Finished") +
                ": " +
                (state.current.endTime - state.current.startTime) / 1000 +
                " seconds"}
            </div>
          )}
        </div>
      )}
      {session.current && (
        <div className="progressContainer">
          {session.current.meta.steps.includes("unzip") &&
            state.current.unzip && (
              <ProgressComponent
                progress={state.current.unzip}
                step={"unzip"}
                meta={session.current.meta}
              />
            )}
          {session.current.meta.steps.includes("copy") &&
            state.current.copy && (
              <ProgressComponent
                progress={state.current.copy}
                step={"copy"}
                meta={session.current.meta}
              />
            )}
          {session.current.meta.steps.includes("convert") &&
            state.current.convert && (
              <ProgressComponent
                progress={state.current.convert}
                step={"convert"}
                meta={session.current.meta}
              />
            )}
          {session.current.meta.steps.includes("compaction") &&
            state.current.compaction && (
              <ProgressComponent
                progress={state.current.compaction}
                step={"compaction"}
                meta={session.current.meta}
              />
            )}
          {session.current.meta.steps.includes("extract") &&
            state.current.extract && (
              <ProgressComponent
                progress={state.current.extract}
                step={"extract"}
                meta={session.current.meta}
              />
            )}
          {state.current.dl && state.current.error === undefined && (
            <div className="hFlex" style={{ marginTop: 20 }}>
              <div style={{ height: "38px", lineHeight: "38px" }}>
                {gettext("Completed")}
              </div>
              <a
                className="roundButton"
                style={{ marginLeft: 10, paddingLeft: 20, paddingRight: 20 }}
                href={`./dl/${state.current.dl.id}?action=download&filename=${state.current.dl.filename}`}
              >
                {gettext("Export")} {state.current.dl.filename}
              </a>
            </div>
          )}
        </div>
      )}
      {state.current.error && <ErrorMessage error={state.current.error} />}
    </>
  );
};
