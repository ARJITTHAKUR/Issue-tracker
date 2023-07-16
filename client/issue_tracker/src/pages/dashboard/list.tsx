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
        {!projectList ? (
          <h1>Loading...</h1>
        ) : (
          projectList?.map((list) => {
            return (
              <>
                <li
                  key={list.UserId}
                  onClick={() => onListItemClick(list.ID)}
                  className="list-item"
                >
                  <span>
                    <DocumentTextIcon height={30} width={20}/>
                  
                  <span>{list?.projectname}</span>
                  </span>
                  <span>
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
