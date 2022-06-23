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
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    if (!files || files.length !== 1) {
      console.error("no file selected, or one or more files selected");
      return;
    }
    const id = uuidv4();
    const file = files.item(0)!;
    const s = new ConvertSession({
      id,
      file,
      updateProgress,
      onFinish,
      onError,
    });
    session.current?.close();
    session.current = s;
    s.start(file);

    setState({ id });
    onStart();
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
        <div>{gettext("Select a world to convert")}</div>
        <div className="hFlex" style={{ marginTop: 20 }}>
          <label className="roundButton inputLabel" htmlFor="input_directory">
            {gettext("Select directory")}
            <input
              id={"input_directory"}
              type={"file"}
              onChange={onChange}
              ref={inputDirectory}
              disabled={state.current.id !== undefined}
              style={{ display: "none" }}
            />
          </label>
          <label className="roundButton inputLabel" htmlFor="input_zip">
            {gettext("Select zip file")}
            <input
              id={"input_zip"}
              type={"file"}
              onChange={onChange}
              accept={".zip"}
              ref={inputFile}
              disabled={state.current.id !== undefined}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
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
          <div className="message">
            <div className="downloadMessage">
              {`Completed: download `}
              <a
                href={`./dl/${state.current.dl.id}?action=download&filename=${state.current.dl.filename}`}
              >
                {state.current.dl.filename}
              </a>
            </div>
          </div>
        )}
        {state.current.error && <ErrorMessage error={state.current.error} />}
      </div>
    </>
  );
};
