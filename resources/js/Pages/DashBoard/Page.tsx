import React from "react";
import DashBoardLayout from "../../Layouts/DashBoardLayout";

const Page = () => {
    return <div></div>;
};

Page.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="Subscribe Page">{page}</DashBoardLayout>
);

export default Page;
