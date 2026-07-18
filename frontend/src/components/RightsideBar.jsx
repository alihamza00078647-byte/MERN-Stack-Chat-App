import assets from "../assets/assets";



function RightSideBar({selectedUser, setSelectedUser}) {
    return selectedUser && (
        <div>
            <div>
                <img src={selectedUser?.plofilePic || assets.avatar_icon} alt="" 
                className="w-20 aspect-[1/1] rounded-full" />
            </div>
        </div>
    )
}


export default RightSideBar;