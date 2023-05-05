import { API } from "aws-amplify";
import { BaseSyntheticEvent, useEffect, useState } from "react";

type Props = {
  username: string;
};

type RideItem = {
    RideId: string,
    Name: string,
    userId: string,
}

export function RideList(props: Props) {
  const [username, setUsername] = useState("");
  const [rideList, setRideList] = useState([]);

  useEffect(() => {
    setUsername(props.username);
    API.get("restapi", "/items/:RideId", {})
      .then((list) => {
        setRideList(list);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    console.log("handleSubmit", event);
    const rideId = (event.target as any)[0].value;
    const name = (event.target as any)[1].value;
    const params = {
      body: {
        RideId: rideId,
        Name: name,
        userId: username,
      },
    };
    console.log("handleSubmit", params);
    API.post("restapi", "/items", params).then((value) => console.log(value));
  };
  return (
    <>
      <p>Ride List</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="rideId" />
        <input type="text" name="name" />
        <input type="submit" name="Submit" />
      </form>
      <div className="RideList_Wrapper">
        {rideList.map((item: RideItem) => {
          return (
            <div className="RideItem" key={item.RideId}>
              <p>
                {item.RideId} {item.Name} ({item.userId})</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
