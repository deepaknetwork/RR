import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/common/login";
import Home from "../pages/common/home";
import Houses from "../pages/owner/houses";
import EditRoom from "../pages/owner/ownerroom";
import { getName, getRole } from "../utils/auth";
import Room from "../pages/common/room";
import GuestBookings from "../pages/guest/guestBookings";
import Signup from "../pages/common/signup";
import ProfileOwner from "../pages/owner/profileowner";
import ProfileGuest from "../pages/guest/profileguest";

export default function AppRouter() {
    return (
        <Router >
            <Routes>
                <Route path="RR/" element={<Home />} />
                <Route path="RR/room/:houseNo/:roomNo" element={<Room />} />
                {getName() === null && <Route path="RR/login" element={<Login />} />}
                {getName() === null && <Route path="RR/signup" element={<Signup />} />}
                {getName() !== null && <Route path="RR/booking" element={<GuestBookings />} />}
                {getName() !== null && <Route path="RR/profile" element={getRole() === 'OWNER' ? <ProfileOwner /> : <ProfileGuest />} />}
                {getRole() === 'OWNER' && <Route path="RR/houses" element={<Houses />} />}
                {getRole() === 'OWNER' && <Route path="RR/editroom" element={<EditRoom />} />}
                <Route path="*" element={<Navigate to="RR/" />} />
            </Routes>
        </Router>
    )
}