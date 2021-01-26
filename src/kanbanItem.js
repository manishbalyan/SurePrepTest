import React, {  useRef } from "react";
import { useDrag } from "react-dnd";

const KanbanItem = ({ id, children }) => {
    const ref = useRef(null);
    const [{ isDragging }, drag] = useDrag({
      item: { type: "card", id },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    });
    const opacity = isDragging ? 0.2 : 1;
    const border= isDragging ?"1px dashed gray":'none'
    const margin='10px 0px 22px 10px'
    drag(ref);
    return (
      <div ref={ref} style={{margin, opacity ,border}}>
        {children}
      </div>
    );
  };

  export default KanbanItem;