import React, { ChangeEvent, useEffect, useRef } from "react";
import { Progress } from "./progress";
import { v4 as uuidv4 } from "uuid";
import { ConvertSession } from "./convert-session";
import { gettext } from "./i18n";
import { useForceUpdate } from "./main";
import { ProgressReducer } from "./state";
import { WorkerError } from "../share/messages";
import { ErrorMessage } from "./error-message";

type State = {
  id?: string;
  unzip?: number;
  convert?: { num: number; den: number };
  compaction?: number;
  dl?: { id: string; filename: string };
  error?: WorkerError;
  startTime?: number;
  endTime?: number;
};

export const J2B: React.FC<{ onFinish: () => void; onStart: () => void }> = ({
  onFinish,
  onStart,
}) => {
  const session = useRef<ConvertSession | null>(null);
  const forceUpdate = useForceUpdate();
  const state = useRef<State>({});
  const setState = (p: Partial<State>) => {
    state.current = { ...state.current, ...p };
    forceUpdate();
  };
  const updateProgress = (reducer: ProgressReducer) => {
    const { unzip, convert, compaction } = state.current;
    setState({ ...reducer({ unzip, convert, compaction }) });
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
      if (!files) {
        console.error("no file selected, or one or more files selected");
        return;
      }
      if (!files || files.length !== 1) {
        console.error("no file selected, or one or more files selected");
        return;
      }
      const id = uuidv4();
      const s = new ConvertSession({
        id,
        fileList: files,
        updateProgress,
        onFinish: onFinishCalled,
        onError,
      });
      session.current?.close();
      session.current = s;
      s.start(files);

      setState({ id, startTime: Date.now() });
      onStart();
    };
  };
  const inputDirectory = useRef<HTMLInputElement>(null);
  const inputFile = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputDirectory.current!.setAttribute("webkitdirectory", "");
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
              <label className="roundButton inputLabel" htmlFor="input_zip">
                {gettext("Select zip file")}
                <input
                  id={"input_zip"}
                  type={"file"}
                  onChange={changeHandler({ file: true })}
                  accept={".zip"}
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
          <Progress
            progress={state.current.unzip ?? 0}
            total={1}
            label={"Unzip"}
          />
          <Progress
            progress={Math.floor(state.current.convert?.num ?? 0)}
            total={state.current.convert?.den ?? 1}
            unit={"chunks"}
            label={"Conversion"}
          />
          <Progress
            progress={state.current.compaction ?? 0}
            total={1}
            label={"LevelDB Compaction"}
          />
          {state.current.dl && (
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
