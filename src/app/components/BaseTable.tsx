import { chakra, InputLeftElement, Box, Input, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Button, InputGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import SearchIcon from "../icons/searchIcon";
import ChevronIconLeft from "../icons/left";
import ChevronIconRight from "../icons/right";

interface Data {
    name: string;
    service_name: string;
    endpoint: string;
    rest_action: string;
    rpc_queue: string;
    http_command: string;
    kwargs: {
        min_role?: number;
    };
}

interface Props {
    data: Data[];
}

const ReusableTable: React.FC<Props> = ({ data }) => {
    const [page, setPage] = useState(0);
    const [filterText, setFilterText] = useState("");
    const itemsPerPage = 4;

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
    );
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(e.target.value);
        setPage(0); // Reset page to first page when filter changes
    };

    const getPageNumbers = (): number[] => {
        const totalButtons = 7; // Including "Previous" and "Next" buttons
        const pageNumbers: number[] = [];

        if (pageCount <= totalButtons) {
            for (let i = 0; i < pageCount; i++) {
                pageNumbers.push(i);
            }
        } else {
            const middleIndex = Math.floor(totalButtons / 2);
            let startPage = Math.max(page - middleIndex, 0);
            let endPage = startPage + totalButtons - 1;

            if (endPage >= pageCount) {
                endPage = pageCount - 1;
                startPage = Math.max(endPage - totalButtons + 1, 0);
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers;
    };

    return (
        <Box>
            <InputGroup className="mb-10">
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input className="bg-white" type='text' placeholder='Filter by name' value={filterText} onChange={handleFilterChange} />
            </InputGroup>
            <Table variant="simple">
                <Thead>
                    <Tr className="py-8">
                        <Th>Name</Th>
                        <Th>Endpoint</Th>
                        <Th>Service</Th>
                        <Th>Queue</Th>
                        <Th>Security</Th>
                        <Th>HttpCommands</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredData
                        .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                        .map((item, index) => (
                            <Tr key={index}>
                                <Td>{item.name}</Td>
                                <Td>{item.endpoint}</Td>
                                <Td>{item.service_name}</Td>
                                <Td>{item.rpc_queue}</Td>
                                <Td>{item.rest_action}</Td>
                                <Td>
                                    <button className="text-[#5C73DB] border border-[#5C73DB] rounded-lg w-full p-[8px]">
                                        {item.http_command}
                                    </button>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
                <TableCaption>
                    <div className="flex justify-between">
                        <div>
                            <span>{filteredData.length} records</span>
                        </div>
                        <div>
                            <Button
                                disabled={page === 0}
                                onClick={() => handleChangePage(page - 1)}
                                mr={2}
                            >
                                <ChevronIconLeft />
                            </Button>
                            {getPageNumbers().map((pageNumber) => (
                                <Button
                                    key={pageNumber}
                                    onClick={() => handleChangePage(pageNumber)}
                                    colorScheme={page === pageNumber ? "blue" : undefined}
                                >
                                    {pageNumber + 1}
                                </Button>
                            ))}
                            <Button
                                disabled={page === pageCount - 1}
                                onClick={() => handleChangePage(page + 1)}
                                ml={2}
                            >
                                <ChevronIconRight />
                            </Button>
                        </div>
                    </div>
                </TableCaption>
            </Table>
        </Box>
    );
};

export default ReusableTable;
