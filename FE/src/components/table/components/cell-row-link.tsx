import React from "react";
import { Link } from "react-router-dom";

export interface CellRowLinkProps {
    name: string;
    to: string;
}

export const CellRowLink: React.FC<CellRowLinkProps> = ({ name, to }) => {
    return (
        <div>
            <Link to={to}>{name}</Link>
        </div>
    );
};
