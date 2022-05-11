import React from "react";
import classnames from "classnames";

import styles from "./SandboxList.module.scss";

export default function SandboxList({
  className,
  ...divProps
}: React.ComponentProps<"div">) {
  return (
    <div className={classnames(styles.sandboxList, className)} {...divProps} />
  );
}

export function SandboxCategory({
  title,
  className,
  children,
  ...divProps
}: React.ComponentProps<"div"> & { title: string }) {
  return (
    <div
      className={classnames(styles.sandboxCategory, className)}
      {...divProps}
    >
      {title}
      <div className={styles.sandboxCategoryContent}>{children}</div>
    </div>
  );
}

export function SandboxItem({
  title,
  id,
  onSelect,
  ...divProps
}: Omit<React.ComponentProps<"div">, "onSelect"> & {
  title: string;
  id: string;
  onSelect: (sandboxId: string) => void;
}) {
  return (
    <div className={styles.sandboxItem} {...divProps}>
      <button onClick={() => onSelect(id)} className={styles.sandboxItemTitle}>
        {title}
      </button>
    </div>
  );
}
