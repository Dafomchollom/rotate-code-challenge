import { Box, Button, Input, InputGroup, InputLeftElement, Table, TableCaption, Tbody, Td, Th, Thead, Tr, border } from "@chakra-ui/react";
import React, { useState } from "react";
import ChevronIconLeft from "../icons/left";
import ChevronIconRight from "../icons/right";
import SearchIcon from "../icons/searchIcon";

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

            // Ensure there are at most 7 buttons
            if (endPage - startPage + 1 < totalButtons) {
                endPage = startPage + totalButtons - 1;
            }

            // Concatenate pages in the middle
            if (startPage > 0) {
                pageNumbers.push(-1); // Placeholder for concatenation
            }
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
            if (endPage < pageCount - 1) {
                pageNumbers.push(-2); // Placeholder for concatenation
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
                                border={"1px solid #E4E4E7"}
                                borderRight={0}
                                size={"sm"}
                                borderRadius={0}
                                borderTopLeftRadius={10}
                                borderBottomLeftRadius={10}
                                bg={"#ffffff"}
                            >
                                <ChevronIconLeft />
                            </Button>
                            {getPageNumbers().map((pageNumber, index) => (
                                <React.Fragment key={index}>
                                    {pageNumber === -1 || pageNumber === -2 ? (
                                        <Button border={"1px solid #E4E4E7"}
                                            borderRight={0}
                                            size={"sm"}
                                            bg={page === pageNumber ? "#4763E4" : "#ffffff"}
                                            borderRadius={0}>...</Button>
                                    ) : (
                                        <Button
                                            onClick={() => handleChangePage(pageNumber)}
                                            bg={page === pageNumber ? "#4763E4" : "#ffffff"}
                                            color={page === pageNumber ? "#ffffff" : "#27272A"}
                                            border={"1px solid #E4E4E7"}
                                            borderRight={0}
                                            size={"sm"}
                                            borderRadius={0}
                                        >
                                            {pageNumber + 1}
                                        </Button>
                                    )}
                                </React.Fragment>
                            ))}
                            <Button
                                disabled={page === pageCount - 1}
                                onClick={() => handleChangePage(page + 1)}
                                border={"1px solid #E4E4E7"}
                                borderLeft={0}
                                size={"sm"}
                                borderRadius={0}
                                borderTopRightRadius={10}
                                borderBottomRightRadius={10}
                                bg={"#ffffff"}
                            >
                                <ChevronIconRight />
                            </Button>
                        </div>
                    </div>
                </TableCaption>
            </Table>
        </Box >
    );
};

export default ReusableTable;
