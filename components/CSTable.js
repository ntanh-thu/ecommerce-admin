import Loader from "./Loader";

const CSTable = ({ header = {}, body = [], width = {} }) => {
  return (
    <div className="bg-cstable">
      <table className="cstable">
        <thead className="cstable-head">
          <tr>
            {Object.entries(header).map((item, i) => (
              <td
                key={i}
                style={
                  width[item[0]] !== undefined ? { width: width[item[0]] } : {}
                }
              >
                {item[1]}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="cstable-body">
          {body.length !== 0 ? (
            body.map((rows, irows) => {
              return (
                <tr key={irows}>
                  {Object.keys(header).map((keyheader, ikey) => {
                    return (
                      <td
                        key={ikey}
                        style={
                          width[keyheader] !== undefined
                            ? { width: width[keyheader] }
                            : {}
                        }
                      >
                        {rows[keyheader]}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <Loader />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CSTable;
