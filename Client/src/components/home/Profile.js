import icons from "../../utils/icons";
import { useEffect, useState } from "react";
import UserApi from "../../getApi/UserApi";
import { useNavigate, useParams } from "react-router-dom";
import HandleCookies from "../../utils/HandleCookies";
import ImageUploader from "./ImageUploader";
import CommitGrid from "./CommitGrid";
import NavProfile from "./NavProfile";
import Ranking from "./Ranking";
const {
  IoIosChatboxes,
  IoIosSettings,
  IoDocumentText,
  MdEmail,
  FaStar,
  BsCalendar2DateFill,
  FaLocationDot,
  FaChartLine,
} = icons;

const Profile = () => {
  const [user, setUser] = useState();
  const [isHome, setIsHome] = useState(false);
  const [id, setId] = useState();
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    UserApi.getUserByUsername(params?.username)
      .then((res) => {
        setUser(res?.data?.data);
        setId(res?.data?.data?._id);
        if (params?.username === HandleCookies.getCookie("username")) {
          setIsHome(true);
        }
      })
      .catch((err) => console.log(err));
  }, [params?.username]);

  return (
    <div className="w-full">
      <NavProfile username={user?.username} />
      <div className="border-[2px] rounded-md border-solid mr-5 border-gray-300 text-left p-3 flex">
        <div className="w-[65%]">
          <Ranking
            username={user?.username}
            rating={user?.rating}
            title={true}
          />
          <p
            className={
              user?.firstname || user?.lastname ? "text-gray-600" : "hidden"
            }
          >
            {`${user?.firstname} ${user?.lastname}`}
          </p>
          <div className="flex items-center">
            <FaChartLine className="mr-[5px]" />
            <span>Rating: {user?.rating || 0}</span>
          </div>
          <div className="flex items-center">
            <FaLocationDot className="mr-[5px]" />
            Location:{" "}
            <span className="ml-[5px] underline hover:cursor-pointer">
              Hanoi
            </span>
            ,{" "}
            <span className="ml-[5px] underline hover:cursor-pointer">
              Vietnam
            </span>
          </div>
          <div className="flex items-center">
            <FaStar className="mr-[5px]" />
            Contribution:{" "}
            <span className="ml-[5px] text-green-600 font-bold">
              {user?.contribution || 0}
            </span>
          </div>
          <div className={isHome == false ? "hidden" : "flex items-center"}>
            <IoIosSettings className="mr-[5px]" />
            <span className=" underline hover:cursor-pointer">
              <a href={`/setting/${user?.username}`}>Change settings</a>
            </span>
          </div>
          <div className="flex items-center">
            <MdEmail className="mr-[5px]" />
            <span>{user?.email || "email"}</span>
          </div>
          <div className="flex items-center">
            <BsCalendar2DateFill className="mr-[5px]" />
            <span>Registered: {user?.createdAt.slice(0, 10) || "time"}</span>
          </div>
          <div className={isHome == false ? "hidden" : "flex items-center"}>
            <IoDocumentText className="mr-[5px]" />
            <span className="underline hover:cursor-pointer">
              <a href="/writeblog">Write Blog</a>
            </span>
          </div>
          <div className={"flex items-center"}>
            <IoIosChatboxes className="mr-[5px]" />
            <span className="underline hover:cursor-pointer">
              <a
                href={
                  isHome
                    ? "/usertalk"
                    : `/message?username=${params.username}&id=${id}`
                }
              >
                Message
              </a>
            </span>
          </div>
        </div>
        <div className="w-[35%]">
          <ImageUploader user={user} isHome={isHome} />
        </div>
      </div>
      <div className="border-[2px] rounded-md border-solid mt-[15px] mr-5 border-gray-300 text-left p-3 flex">
        <CommitGrid author={user?._id} day_of_register={user?.createdAt} />
      </div>
    </div>
  );
};
export default Profile;
