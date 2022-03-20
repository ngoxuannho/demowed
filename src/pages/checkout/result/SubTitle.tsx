import { useSelector } from "react-redux";
import { List } from "antd";
import { RootState } from "../../../slices/rootReducer";
export default () => {
    const { user } = useSelector((state: RootState) => state);
    const userEntries = Object.entries(user)
      .map((entry: any) => {
        if (entry[0] == "residence") {
          entry[1] = entry[1]
            .map((letter: string) =>
              letter
                .split("_")
                .map(
                  (letter: string) =>
                    letter.charAt(0).toUpperCase() + letter.slice(1)
                )
                .join(" ")
            )
            .join(", ");
        }
        return [
          entry[0]
            .split(/(?=[A-Z])/)
            .map(
              (letter: string) =>
                letter.charAt(0).toUpperCase() + letter.slice(1)
            )
            .join(" "),
          entry[1],
        ];
      })
      .filter((user) => user[1] !== "" && typeof user[1] !== "boolean");
    return (
      <List
        size="small"
        dataSource={userEntries}
        renderItem={(user: [][]) => {
          return (
            <List.Item>
              <span style={{textAlign:"start"}}>
                {user[0]} : {user[1]}
              </span>
            </List.Item>
          );
        }}
      />
    );
  
};
