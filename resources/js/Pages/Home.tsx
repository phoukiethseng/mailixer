import React from "react";
import DashBoardLayout from "../Layouts/DashBoardLayout";

const HomePage = () => {
    return <div>HomePage</div>;
};

HomePage.layout = (page: React.ReactNode) => (
    <DashBoardLayout>{page}</DashBoardLayout>
);

export default HomePage;
