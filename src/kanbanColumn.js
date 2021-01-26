import React, {  useRef } from "react";
import { useDrop } from "react-dnd";
import './styles/kanbanColumn.css'

const KanbanColumn = ({ status, changeTaskStatus, children }) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
      accept: "card",
      drop(item) {
        changeTaskStatus(item.id, status);
      }
    });
    drop(ref);
    return <div className='kanban-column-section' ref={ref}> {children}</div>;
  };

  export default KanbanColumn;