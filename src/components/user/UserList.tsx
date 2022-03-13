import axios from "axios";
import React, {FC, SyntheticEvent, useEffect, useState} from "react";
import {Button, Card, Image, Nav, Pagination} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

interface Pagination {
    next?: {
        limit?: number;
        page?: number;
    };
    previous?: {
        limit?: number;
        page?: number;
    };
    total?: number;
}

const UserList = () => {
    const userLogin = useSelector((state: any) => state.userLogin);
    const URL: string = "https://jtlx-task-serverside.herokuapp.com/uploads/";
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState<Pagination>({});
    const token = sessionStorage.getItem("access_token");

    const handleUser = async (page: number, limit: number) => {
        setPage(page);
        setLimit(limit);
        await axios
            .get(
                `${process.env.REACT_APP_JTLX_API_URL}/user/?page=${page}&limit=${limit}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then((res) => {
                setUsers(res.data.users);
                setPagination(res.data.pagination);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (userLogin.login == true) handleUser(page, limit);

    }, []);

    const changePerPage = (e: SyntheticEvent) => {
        const {name, value}: any = e.target;
        handleUser(page, value);
    };

    const handlePage = (pageParam: any, limitParam: any) => {
        handleUser(pageParam, limitParam);
    };

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title className="my-2">
                        Registered Users({pagination.total || 0})
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    {users.map((value: any, key: any) => {
                        let image: string = URL + value.image;
                        return (
                            <div key={key} className="p-1 user">
                                <div className="p-card">
                                    <div className="p-card-image">
                                        <Image
                                            crossOrigin="anonymous"
                                            width={130}
                                            height={130}
                                            roundedCircle
                                            src={image}
                                        ></Image>
                                    </div>

                                    <div className="p-card-content">
                                        <div className="content-left">
                                            <p className="lead mb-0">
                                                {value.name} {value.surname}
                                            </p>
                                            <p className="mb-0">@{value.username}</p>
                                            <p className="mb-0">
                                                <strong>Phone Number: </strong>
                                                {value.phoneNumber}
                                            </p>
                                            <p className="mb-0">
                                                <strong>Email Address: </strong>
                                                {value.email}
                                            </p>
                                            <p className="mb-0 about">
                                                <strong>About: </strong>
                                                {value.about}
                                            </p>
                                        </div>
                                        <div className="content-right">
                                            <h6 className="m-0">Location</h6>
                                            <p className="m-0">
                                                {value.location.coordinates[0]}
                                                {","}
                                                {value.location.coordinates[1]}
                                            </p>
                                            <h6 className="m-0">Balance</h6>
                                            <p className="m-0">{value.balance}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Card.Body>
                <Card.Footer>
                    <div className="user-footer">
                        <div>
                            <h6>Show Per Page</h6>
                            <select
                                name="limit"
                                className="form-control bg-dark text-white"
                                onChange={changePerPage}
                            >
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <div>
                            <h6>Page {page}</h6>
                            <button
                                disabled={pagination.previous ? false : true}
                                className="btn btn-dark"
                                onClick={(e: SyntheticEvent) => {
                                    handlePage(
                                        pagination.previous && pagination.previous.page
                                            ? pagination.previous.page
                                            : page,
                                        limit
                                    );
                                }}
                            >
                                Previous
                            </button>
                            <button
                                disabled={pagination.next ? false : true}
                                className="btn btn-dark"
                                onClick={(e: SyntheticEvent) => {
                                    handlePage(
                                        pagination.next && pagination.next.page
                                            ? pagination.next.page
                                            : page,
                                        limit
                                    );
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </>
    );
};

export default UserList;
