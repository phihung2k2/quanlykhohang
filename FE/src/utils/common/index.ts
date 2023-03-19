import LogT from "logt";
import * as React from "react";

// named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
export function lazyImport<T extends React.ComponentType<any>, I extends { [K2 in K]: T }, K extends keyof I>(
    factory: () => Promise<I>,
    name: K
): I {
    return Object.create({
        [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
    });
}

// let logger: LogT;

// if (process.env.NODE_ENV === 'production') {
//   logger = new LogT('none'); // or logger = new LogT("none")
// } else {
//   logger = new LogT('silly');
// }

export function logger() {
    if (process.env.NODE_ENV === "production") {
        return new LogT("none"); // or logger = new LogT("none")
    }
    return new LogT("silly");
}

// export { logger };
