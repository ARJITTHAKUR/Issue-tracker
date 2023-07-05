import { DocumentTextIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Project } from "./interfaces";

interface props {
  projectList: Project[];
  onListItemClick: (id: number) => void;
}

export default function List({ projectList, onListItemClick }: props) {
  return (
    <>
      <ul>
        {projectList.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          projectList?.map((list) => {
            return (
              <>
                <li
                  key={list.UserId}
                  onClick={() => onListItemClick(list.ID)}
                  style={{ display: "flex", gap: 8, width: "100%" }}
                >
                  <span>
                    <DocumentTextIcon height={30} width={20} />
                  </span>
                  <span style={{ fontWeight: 600 }}>{list?.projectname}</span>
                  <span style={{ alignSelf: "end" }}>
                    <TrashIcon height={25} width={25} />
                  </span>
                </li>
              </>
            );
          })
        )}
      </ul>
    </>
  );
}
