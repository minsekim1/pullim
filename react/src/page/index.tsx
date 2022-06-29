export function MainPage({ photoList }: any) {
  console.log(photoList.length);
  return (
    <div
      style={{
        width: 300,
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "scroll",
      }}
    >
      <div style={{ minHeight: "1000px" }}>
        {photoList.length !== 0 &&
          photoList.map((photo: string, i: number) => (
            <div
              key={i}
              style={{
                width: "250px",
                height: "250px",
                marginBottom: "10px",
                border: "1px solid white",
              }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={photo}
                alt="asa"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
