import { ClipLoader, MoonLoader } from "react-spinners";

export default function Loader()
{
    const styleObj={
        display:"block",
        margin:"40vh auto"
      }
    return(
        <>
        <div className="container">
            <div className="row ">
                <div className="col-3 my-auto mx-auto" >
                <ClipLoader  size={"150px"} cssOverride={styleObj} loading={true} />
                </div>
            </div>
        </div>
        </>
    )
}