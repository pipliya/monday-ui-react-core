import Flex from "../../../components/Flex/Flex";
import { Source } from "@storybook/addon-docs";
import { FC, ReactElement } from "react";
import styles from "./code-example.module.scss";

type CodeExampleProps = {
  children: ReactElement;
  text: string;
  code: string;
  height: number;
};

export const CodeExample: FC<CodeExampleProps> = ({ children, text, code, height = 400 }) => {
  return (
    <Flex className={styles.codeExample} gap={Flex.gaps.SMALL} style={{ height }}>
      <Flex className={styles.example} align={Flex.align.CENTER} justify={Flex.justify.CENTER}>
        {children}
      </Flex>
      <Flex direction={Flex.directions.COLUMN} className={styles.explanation}>
        <p>{text}</p>
        <Source language="javascript" dark format={false} code={code} />
      </Flex>
    </Flex>
  );
};
