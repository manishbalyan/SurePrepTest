import React, { useState, useCallback } from "react";
import { DndProvider} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import KanbanColumn from "./kanbanColumn";
import KanbanItem from "./kanbanItem";
import './styles/kanban.css'
import { channels, labelsMap, tasksList } from "./constant";

const Kanban = () => {
  const [tasks, setTaskStatus] = useState(tasksList);

  const changeTaskStatus = useCallback(
    (id, status) => {
      let task = tasks.find(task => task.id === id);
      const taskIndex = tasks.indexOf(task);
      task = { ...task, status };
      let newTasks = update(tasks, {
        [taskIndex]: { $set: task }
      });
      setTaskStatus(newTasks);
    },
    [tasks]
  );

  return (
    <main>
      <header className='kanban-header'> 
        <img className='logo-img' alt='logo' src='https://41kypz1ayytu4b9qxe1ay75k-wpengine.netdna-ssl.com/wp-content/themes/sureprep2017/img/sureprep-logo.png'/>
        <h1 className='heading-text'>SurePrep Kanban Board </h1>
        </header>
      <DndProvider backend={HTML5Backend}>
        <section className='board'>
          {channels.map(channel => (
            <KanbanColumn
              key={channel}
              status={channel}
              changeTaskStatus={changeTaskStatus}
            >
              <div className='column'>
                <div className='column-head'>{labelsMap[channel]}
                <span className='dots'> </span>
                </div>
                <div >
                  {tasks
                    .filter(item => item.status === channel)
                    .map(item => (
                      <KanbanItem key={item.id} id={item.id}>
                        <div className='item'>
                          <div className='task-meta'>
                            <div>
                            <span className={`${item.priority.toLowerCase()} priority`}>{item.priority}</span>
                            <span className='task-no'>{item.taskNo}</span>
                            </div>
                            <span className='created-date'>{item.createdDate}</span>
                          </div>
                          <div className='task-title'>
                          {item.title}
                          </div>
                          <div className='task-tags'>
                            {item.tags.map((tag)=><span>{tag}</span>)}
                          </div>
                          <div className='task-other-info'>
                            <div>
                            <div className='inline-flex'>
                              <img className='icons' alt='comments' src='https://png.pngitem.com/pimgs/s/150-1509059_message-icon-png-image-free-download-searchpng-grey.png'/>
                              <span className='task-info-text'>{item.comments}</span>
                            </div>
                            <div className='inline-flex'>
                              <img className='icons-link' alt='links' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///+AgIB9fX2BgYH7+/t6enqJiYn29vaFhYX5+fny8vKMjIzHx8fu7u7ExMTAwMDPz8/h4eGVlZXY2Ni2traoqKja2tqcnJzS0tLl5eWysrKWlpakpKS6urqgoKCnp6dMvBf9AAAMyUlEQVR4nN1d6YKyOgzVUBBZZF8VfP+3vODMN+MopKdQFu/5PYMc2qZpcpIeDh8AIc5V6V06eGFS+Wchtn4jjTj5Vdi0rvkMcm9N4jvnrd9tPoQfeVlPjuj4B0SmaRRpWZ22fsVZcJKgtd/IPdE0Ka7DauvXnIwquLnj7H7GshvJ5CMXZVTHhozeN8mjeyu3fl1lRDfriPH7ImkX+davrITqZirQ+56t2eesRz9V5tfDtC/O1q8OwQnjKfwe43iLtn57AFFmTyXYDaPr7d0HEN7kAfwaRSP1t+bAI50xgN+47dngnLO59PphvO53Mfrt7AF8ULT2ujVWhRaC/WLcp4cT6SLYu3HJ1mwGkOsjuM+JmszbJd4oxnszN7mrlWBHsd3XvpjoJtih3tPhP7H0Ezwa3ta0fhEuQbA7Mu7F2ohwgSn6oNju4zC1GMHupBFsTe6B5Qh2S3EPW8Yya/Ab1G5NbwpBaXjxzx9v7r0pESTTJMOKXds4mmAgh64bB1I9+LxLR9stmrL6emE/Dwos2Ljtpig8dATJvtblixdWNQXwfajd0LMR6BQl4+YNOZmOB3C0wtWJ/QAdQbpexpzoKpBuNVRvFny7YGuQ7JqJLJ0T2alyu2MUaGTIksSx/daUPGIjW4MSdEuZuT/deYqUbeKdolP0CsQ+Tzf+WdYG01SgBLFzuiQIaa5vTQU4RQ10fkVsjIdWP+yjBO0aXUDdEzmG8doRG3CK2iluIZw79yRaOZGBjmCjYgJLi3nUygsRXYON0uI5ccbGTJciM4SAWzFPBFXjD54x/jAq1jtCiQDTjxgX1Sf7nINqr8bwjBkZsidEkLht31xruwA3+s4VnfDNL4zvZq5lTAOM4DSxQc4xXCk0jI6gN2nVOMwzV9ousG1iKsHDgTHS5ioHKJDg9MgRs+ebyqZZHaiRMabPJ8b7NhuNVIYBRtW6KTr9N5hwxvL5CzCq1lnRGT/CjeHiDLHkC7nhHN+D+Y3F12Fi9UJ0o3PYaECRronglrY0ct0sCMskL5MyDNL71TUG0g5kzSPI7ocLC4i8/PT07kKcnapsCvsvS7Jn7soR59NsEjI9Rc1TcoXsuZ854Bhule0WVVB8GVman13gYt+0oarWCW+dK9AZmbkPqhiXhtxNk4iOF8+1oj0u3Bn/vnGaNErnEzy14wR3IMk4zf/EfKxt82T+fJxrhuDxuGfhN4iQG0Iq9iGNmgM+NWM2H1nY9gzBGdJuDPcp+lYBr76l+OOXoc+n8tdKrolTh/MiC6LmD5/La4acKmyyW1t0aNtbVqeXMtKZ0AtYfktrMfyyvlpGr7Z7QvdZrbgONbHkrUw/SZeypOIUBfGowo7IPMZNNNub4bO/PZbSRDlRcDUk+sG+CPsyr5peHsNbaLv3w8yCZKBEVppPfwVAQK2epwNQeS1YZf4g6dbl1HGUEyRX/xD6ASKKfOE4LTcEBClJ+8FJIILId7jphGEsgTCzrXu3rwqF+fkMipWHMQcI6g6UOo1KF4QXigTrg76AjKBmiYKYWUBIrYrzUSKJAlurO+N4cytDyA3hqB9UrUhaD4ZVPb/MnKwANAwYwUKn+1txsS4cBibKxghaOk++1VVXFTZCEaw3bTRGunl9pxrkGrQIS7feNG6FWmt4bZkjieyDvX5a4yLUW8Mr6/mA/Rq5GoMzpd4yc8n6wYraydWogoK2XhWwsbEEMmnkajSjS1SAjquiwBHUea5HvENVUDZmBTGTRvZU4dgAFilxHdXWg9uEEegjCNcPqsEeXojYNnGcIr8dAV4gqYjhCmxw11VWiG9AcJgh2vtEn0hvOYJHY2CWggSNVN8aBCtfvtE3G/3urCr/Y/fd0qAE1ao0WOBV2H2VuXG9N16YJOElbS0ZSbq9xTPyPRPs6GVh5XzH78X55Jd3g62JpDdrH2FGhqZE7EZwwSpf+jL6Inz/Wb9h1jC5r4YG3CaO+mqaBVZW0LtP2chBwUlH3/ptJND2PPqSTGDlS+c93RkPPypG/uv19AQezjRWpcMlrjFfGTI8jK9eswAPZzrL7sEpSq3siDaUOSLjpSIIJqjPyIDVZ4R0oHyLIZPxInEDT5+qAXMO6BS9YVXY9XOakczX7AV4ONNLEPnFoU17BFHca9sfMK3Ly1Qrwc+pb4qiBZKUKRhu30uz2+1WB/nrP4VgImv9beKY6fg11LUfDwkoAyVoaJk0GxBEtwlDi3cowFSWzr4eKEE9/v1lAysKVmHr8e9Rt2KDfTB9c56i8BIEF7U7KBrkt/ROUZTgS5REJMXv4R5v5JGCh099RgbtRvIaBvp7w4FpeNAbnVKM3/oEyX4h+Ho0x+5ncGqJ2vDf09YnaL1EHwYCnFRISx98vrDgiaC+NQgT/GtkoqE0EbmSfgn5DSSo0YqGYD+ZF4LOcIt8srlv7zRgKotqfSleMPnylg4Z1e5SPJb7Ol1iUFS1/hR9l3EyAnqia/IechBVimlSe2g0MmCZ+btONeQMYnfUvVSnH5Z93ax3NWW9836h8TwIlpm/6yfOkk2bTCpSL4865GWQxaRwdY7OmAxIcKCfjCO/qaJ3do62bdB4AfswdBIEWz1c3leV76q8sxI0bhNYrHmQ4KFCw/7KUOjipongsCygwjyvCQT1TVFQ9zBSVbTUGGpcg6C4aqyfDNtcbDJ0ZnixlOR4PxlH0lN0GjRqfge9ZgWCBxHoZ2hobA6I3drD9lXTfqvKm2s/B5jid3ib+IeTpO5RFWSjGnAADiZptjmCsLgAJsj/mhLYRpm/kGqPAo1bYkdQn5E5ZxhBab2NAMMRCME5PcDegOXPEHncCftWCEGddaCQ7B5svzkSyFAmOL97zfNL3aFaDdBwO+nEUrY/aHW2JhEX5Cdxw30K5sr7yE61tkSA3ElbIbt0nqnkp3hAUjUH0DatVm1TtWon+D/8TEzwgIPr4/pLUPWp04Wos/ooDgKYUVPc3+rGNcgZAR1d/ffeJvIhtCed0MSjZ5kav3higTf7HnJ3zZ4aRHCUOBLFab5AF7lS6s0YM8JAfpnZmM2h4zWoluiSJ+RO1rxAnhM1rpQjkZWV/jLtSKRS4/npEOGUmTUuZifTtG+hv1iTQ5k6QFNR5jlP+5Y19IJuCbhFmizZd0zSbUnr9V5O7tVZWxTXuMO1KNp73YTR0l3VJHZGb+l3D3FyHL+D42joKoj8XsMO4f4uEFaGZJLO7YG7A+R827pd3R48CYK7HuL/MEclMZVFmi2tDDajubdLvCeB64Ytb3PwCfAYhtAFdhJE4dZdUlNuDOvZj48KO3uT4q8K9mhoz47m9bksctNoQ46C7fc9dy+sHtEROrpZudlcPXPL8D7z4dXvscyO60WPD+Pwubb7cy8teD53PnpepknliL8zVvjJsl4Tt1nMvD3wPY9IJtlum3phkkdVFUVREjatzm4kQygZhsasj5sPp1v76nU62pZl2VYv/Frcsw8ZhvacB48QfOWrNT84CIYhuTOeCxLU2W5lBIxLQ/H0x4KCDJ05+jEwZ6cZY4j1k9EqBBoF55ZOZrh+PxkGnKUxJn5hsI7eWP5OtMfbcPvhpMMhWkevsZ8MC/aypEk5IJCgTrUhC9Zrm/KVUYIa263wOHGztFV/HtgoYD2C7OlpqOWPBKAV1dlPRgbBxYOVI21om7r3etMFwYkwFHMyYJ3NekbmC9yGqHa9AFxmvi7BQ8W+Fdzl4nA4oy2hF7t2YgS8GAr3/QVYR6+zbgIDH9XHI6Zci6tNCfK+d4c7NE9FCuqCNyDYnXTYV4LswgnVk26Sq5OVgAAX0lRgX/2Vt4kfXGRaE8nMgg8Ta28TP5DLaWrO3PgXtIRk7W3iB4DufKhB4BdEcgf1zis6228IpbI2srJkaABEXqMDuCXBg4MYCvf+drGP72UufDfJlgTl93s9QHZc/yjrhJ+nhYvXxgx0r1kVAmzgRyYZblwUsfWow4b5rRV0YhCqaFxJXaC+OcHDQdc9HMPQWCA5GfmC/Ix93Hda470pFKGzQHIOKt13VfyDsROCh0O5UKcAnbfazIOQ3Oo5DeskX0A4usoifzHQ3GVTYKX4H0xQ99U/fVH71ozeIK+dUSHohrvYB/9CwXv7TIJsWl+V4F7vNfd0VCgfp9y9uRq03FNFxZ7vbccux2L5qaQ7tkA0s4cOWRp7Vi0DP5h+M2w/Q/FLRTeDKOOpNpXs5jMKGKp6Wi29WWwp6VZDflXmSKa1vNRQJzxXaW8kI/4sfh2c/rJ0MOlCVov1e94ZnDCTF2F39I5xvV25wUyc8svd5oK/ZJKbeZ9jX4bgRJebO9Rq9CFKL5qy+tTh+4U4+VGfhTH/wr317Pa/vaMQ4uxEoRc84JV5dRKfMDX/AzTquSMtjlBLAAAAAElFTkSuQmCC'/>
                              <span className='task-info-text'>{item.links}</span>
                            </div>
                            </div>
                            <div className='flex'>
                              <div className='add-user'>+</div>
                              <div>
                                <img className='user-img' alt='user' src='https://manishbalyan.com/images/manish.jpg'/>
                              </div>
                            </div>
                            
                          </div>
                          </div>
                      </KanbanItem>
                    ))}
                </div>
              </div>
            </KanbanColumn>
          ))}
        </section>
      </DndProvider>
    </main>
  );
};

export default Kanban;
