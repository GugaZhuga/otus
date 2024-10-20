import Character from "@/models/Character.model";
import { ReactElement } from "react";

type Response = {
  results: Character[],
}

export default async function Characters() : Promise<ReactElement> {
  const response = await fetch("https://swapi.dev/api/people");
  const result = (await response.json()) as Response
  const data: Character[] = result.results;
  console.log(data);
  return (
      <main>
        <table>
          <tbody>
            {data.map(x => {
              return (
                <tr>
                  <td>{x.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
  );
}
