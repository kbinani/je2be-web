import React, { ChangeEvent, useEffect, useRef } from "react";
import { Progress as ProgressComponent } from "./progress";
import { v4 as uuidv4 } from "uuid";
import { ConvertSession } from "../convert-session";
import { gettext } from "../i18n";
import { useForceUpdate } from "./main";
import { WorkerError, WorkerErrorType } from "../../share/messages";
import { ErrorMessage } from "./error-message";
import { directoryNameFromFileList } from "../../share/file-list-ext";
import {
  initialProgress,
  Progress,
  ProgressPair,
  ProgressReducer,
  Step,
} from "../../share/progress";
import {
  ConvertMode,
  convertModeDescription,
  convertModeInputFileExtension,
  convertModeMetadata,
  convertModeRequiredFile,
  convertModeSupportsDirectoryInput,
} from "../mode";
import { Link } from "./link";

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
  onBack: () => void;
}> = ({ onFinish, onStart, onBack, mode }) => {
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
  const isConverting = () => {
    return (
      state.current.startTime !== undefined &&
      state.current.endTime === undefined
    );
  };
  const onCancelOrBack = () => {
    if (isConverting()) {
      if (!confirm(gettext("Do you really want to cancel?"))) {
        return;
      }
    }
    session.current?.close();
    onBack();
  };
  const changeHandler = ({
    file,
    requiredFile,
  }: {
    file: boolean;
    requiredFile?: {
      name: string;
      notFoundError: WorkerErrorType;
      tooManyError: WorkerErrorType;
    };
  }) => {
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
        let numRequiredFiles = 0;
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
        if (requiredFile !== undefined) {
          for (let i = 0; i < files.length; i++) {
            const item = files.item(i);
            if (!item) {
              continue;
            }
            if (item.name === requiredFile.name) {
              numRequiredFiles++;
            }
          }
          if (numRequiredFiles === 0) {
            setState({
              error: { type: requiredFile.notFoundError, native: {} },
            });
            return;
          } else if (numRequiredFiles > 1) {
            setState({
              error: { type: requiredFile.tooManyError, native: {} },
            });
            return;
          }
        }
        source = files;
        filename = dirname;
      }
      const id = uuidv4();
      const meta = convertModeMetadata(mode, file);
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
  const meta = session.current?.meta;
  return (
    <>
      {!session.current && (
        <div className="inputZip">
          <div style={{ textAlign: "center" }}>
            {gettext("Select a world to convert")}
          </div>
          <div style={{ marginTop: 20 }}>
            {gettext("Mode: ") + convertModeDescription(mode)}
          </div>
          <div className="hFlex" style={{ marginTop: 20 }}>
            {(mode === "j2b" ||
              mode === "b2j" ||
              mode === "p2j" ||
              mode === "p2b") && (
              <div className="inputContainer vFlex" style={{ marginRight: 5 }}>
                <label
                  className="roundButton inputLabel"
                  htmlFor="input_directory"
                >
                  {gettext("Select directory")}
                  <input
                    id={"input_directory"}
                    type={"file"}
                    onChange={changeHandler({
                      file: false,
                      requiredFile: convertModeRequiredFile(mode),
                    })}
                    ref={inputDirectory}
                    disabled={state.current.id !== undefined}
                  />
                </label>
                <div className="inputGuidance">
                  {gettext(
                    mode === "j2b" || mode === "b2j"
                      ? "Select a world directory to convert, which must contain a level.dat file"
                      : "Select a world directory to convert, which must contain a GAMEDATA file",
                  )}
                </div>
              </div>
            )}
            <div className="inputContainer vFlex">
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
              <div className="inputGuidance">
                <FileInputGuidance mode={mode} />
              </div>
            </div>
          </div>
        </div>
      )}
      {session.current && (
        <div className="vFlex" style={{ margin: 20 }}>
          <div>
            {(session.current.file instanceof File
              ? gettext("Selected file: ")
              : gettext("Selected directory: ")) + session.current.filename}
          </div>
          {state.current.endTime === undefined && (
            <>
              <div>{gettext("Mode: ") + convertModeDescription(mode)}</div>
              <div>{gettext("Converting...")}</div>
            </>
          )}
          {state.current.startTime && state.current.endTime && (
            <>
              <div>
                {gettext("Elapsed time") +
                  ": " +
                  (state.current.endTime - state.current.startTime) / 1000 +
                  " " +
                  gettext("seconds")}
              </div>
              <div>
                {gettext(
                  "Conversion finished. Click the export button to get the result",
                )}
              </div>
            </>
          )}
        </div>
      )}
      {meta && (
        <div className="progressContainer">
          {meta.steps.map((step, index) => {
            const value = progressValue(state.current, meta.steps, index, step);
            if (!value) {
              return;
            } else {
              return (
                <ProgressComponent
                  key={step}
                  value={value}
                  step={step}
                  meta={meta}
                />
              );
            }
          })}
        </div>
      )}
      {state.current.dl && state.current.error === undefined && (
        <div className="hFlex" style={{ margin: 20 }}>
          <a
            className="roundButton"
            style={{ paddingLeft: 20, paddingRight: 20 }}
            href={`./dl/${state.current.dl.id}?action=download&filename=${btoa(
              encodeURIComponent(state.current.dl.filename),
            )}`}
          >
            {gettext("Export") + ": "} {state.current.dl.filename}
          </a>
        </div>
      )}
      <div
        className="vFlex"
        style={{
          margin: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="roundButton"
          data-destructive={isConverting()}
          onClick={onCancelOrBack}
          style={{ width: 80 }}
        >
          {isConverting() ? gettext("Cancel") : gettext("Back")}
        </div>
      </div>
      {state.current.error && <ErrorMessage error={state.current.error} />}
    </>
  );
};

const FileInputGuidance: React.FC<{ mode: ConvertMode }> = ({ mode }) => {
  switch (mode) {
    case "j2b":
    case "p2j":
    case "p2b":
      return (
        <>{gettext("Select a zip archive of world directory to convert")}</>
      );
    case "b2j":
      return <>{gettext("Select a *.mcworld file to convert")}</>;
    case "x2j":
    case "x2b":
      const url =
        "https://support.xbox.com/help/xbox-360/accessories/using-usb-flash-drive";
      return (
        <>
          {gettext(
            "Select a *.bin to convert. This file can be copied from Xbox360 using USB stick. Check the link to know how to prepare USB stick for Xbox360",
          )}
          <br />
          <Link url={url} />
        </>
      );
  }
};

const progressValue = (
  state: State,
  steps: Step[],
  index: number,
  step: Step,
): ProgressPair | undefined => {
  const base = state[step];
  if (!base) {
    return undefined;
  }
  if (state.dl && state.error === undefined) {
    return {
      progress: base.progress === 1 && base.count === 0 ? 1 : base.count,
      count: base.count,
    };
  }
  if (
    steps.slice(index + 1).some((s) => {
      const p = state[s];
      if (p === undefined) {
        return false;
      }
      return p.progress > 0;
    })
  ) {
    return {
      progress: base.progress === 1 && base.count === 0 ? 1 : base.count,
      count: base.count,
    };
  } else {
    return base;
  }
};
