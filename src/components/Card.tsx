import React from "react";

type Props = {
  data: [{
    title: string,
    isDone: true | false
  }];
  id: Number;
};

const Card = ({ id, data }: Props) => {
  return (
    <>
      {data.length > 0 ? (
        <>
          {data.map((item: String) => {
            return (
              <>
                <div className="">
                  <p className="break-all">{item}</p>
                </div>
              </>
            );
          })}
        </>
      ) : (
        "No data"
      )}
    </>
  );
};

export default Card;
