import { chakra, InputLeftElement, Box, Input, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Button, InputGroup, createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
import React, { useState } from "react";
import SearchIcon from "../icons/searchIcon";
import { tableAnatomy } from '@chakra-ui/anatomy';
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

    const StyledTable = chakra(Table, {
        baseStyle: {
            background: "#ffffff",
        },
    });

    const StyledTableCap = chakra(TableCaption, {
        baseStyle: {
            background: "#ffffff",
            margin: 0,
        },
    });

    const StyledTh = chakra(Th, {
        baseStyle: {
            paddingY: "1.5rem",
            color: "#A1A1AA",
            fontWeight: 'bold',
        },
    });

    const StyledTd = chakra(Td, {
        baseStyle: {
            color: "#27272A",
        },
    });

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
            <StyledTable variant="simple">
                <Thead>
                    <Tr className="py-8">
                        <StyledTh>Name</StyledTh>
                        <StyledTh>Endpoint</StyledTh>
                        <StyledTh>Service</StyledTh>
                        <StyledTh>Queue</StyledTh>
                        <StyledTh>Security</StyledTh>
                        <StyledTh>HttpCommands</StyledTh>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredData
                        .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                        .map((item, index) => (
                            <Tr key={index}>
                                <StyledTd>{item.name}</StyledTd>
                                <StyledTd>{item.endpoint}</StyledTd>
                                <StyledTd>{item.service_name}</StyledTd>
                                <StyledTd>{item.rpc_queue}</StyledTd>
                                <StyledTd>{item.rest_action}</StyledTd>
                                <Td>
                                    <button className="text-[#5C73DB] border border-[#5C73DB] rounded-lg w-full p-[8px]">
                                        {item.http_command}
                                    </button>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
                <StyledTableCap>
                    <div className="flex justify-between mt-20">
                        <div>
                            <span className="text-">{getPageNumbers.length} records</span>
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
                </StyledTableCap>
            </StyledTable>
        </Box>
    );
};

export default ReusableTable;
