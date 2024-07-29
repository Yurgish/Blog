import PageMenuLayout from "./layouts/PageMenuLayout";
import Tabs from "../components/ui/Tabs";
import { Outlet } from "react-router-dom";

const tabs = [
    { name: "Accepted", path: "/user/accepted" },
    { name: "Rejected", path: "/user/rejected" },
    { name: "Pending", path: "/user/pending" },
];

const UserPage = () => {
    return (
        <PageMenuLayout>
            <div className="flex flex-col items-center">
                <Tabs tabs={tabs}></Tabs>
                <div className="w-full mt-6">
                    <Outlet />
                </div>
            </div>
        </PageMenuLayout>
    );
};

export default UserPage;
