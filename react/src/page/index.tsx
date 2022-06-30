export function MainPage({ photoList }: any) {
  console.log(photoList.length);
  return (
    <div
      id = "pullim-page"
      style={{
        width: "0%",
        height: "100vh",
        backgroundColor: "rgba(0,255,255,0.4)",
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
                width: "100%",
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
