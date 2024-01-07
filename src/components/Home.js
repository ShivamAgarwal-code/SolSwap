import { Heading, VStack, Box, Button, Link } from '@chakra-ui/react';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faMedium } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

function Home() {
    return (
        <VStack
            spacing={8}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            pt={24}
            pb={12}
            >
            <Box>
                <Heading
                as="h1"
                fontFamily="body"
                bgColor="blue.400"
                bgClip="text"
                fontSize={["4xl","6xl"]}
                bgGradient="linear(to-l, #79c2ff, #4a5888)"
                >
                GammaSwap 🚀
                </Heading>
            </Box>
            <Box>
                <Heading
                as="h2"
                size={["lg"]}
                fontSize={["2xl","4xl"]}
                lineHeight="tall"
                color="gray.500"
                fontWeight="medium"
                pl={12}
                pr={12}
                >
                    Decentralized Volatility Exchange
                </Heading>
                <Heading
                as="h4"
                mt={"2em"}
                color="white"
                fontWeight="small"
                size={["sm","md","lg"]}>Hackathon version<br/><br/>
                    Only in <Link href='https://ropsten.etherscan.io' style={{fontWeight: 1000 }} color="blue.400"
                                  target="_blank">Ropsten</Link> test network
                    <br/><br/>...for now
                </Heading>
                <div>
                    <Link href='/app' style={{textDecoration: "none"}}>
                        <Button
                            colorScheme='blue'
                            mt={'10'}
                            size={'lg'}
                        >
                            Launch
                        </Button>
                    </Link>
                </div>
                <br/>
                <Box color="white" mt="1em" pl={["1em"]} pr={["1em"]}>
                    <FontAwesomeIcon icon={faYoutube}/>&nbsp;
                    <Link href='https://www.youtube.com/watch?v=VG_laPaN-O4' target="_blank"
                          style={{fontWeight: 1000 }} color="blue.400">
                        Problem
                    </Link>&nbsp;Solved
                </Box>
                <Box color="white" mt="1em" pl={["1em"]} pr={["1em"]}>
                    <FontAwesomeIcon icon={faYoutube}/>&nbsp;View&nbsp;
                    <Link href='https://www.youtube.com/watch?v=FaykgHaVbWA' target="_blank"
                          style={{fontWeight: 1000 }} color="blue.400">
                        Demo
                    </Link>
                </Box>
                <Box color="white" mt="1em" pl={["1em"]} pr={["1em"]}>
                    <FontAwesomeIcon icon={faMedium}/>&nbsp;
                    <Link href='https://medium.com/gammaswap-labs/gammaswap-protocol-6a4430e4b0ad' target="_blank"
                          style={{fontWeight: 1000 }} color="blue.400">
                        Protocol
                    </Link>&nbsp;Description
                </Box>
                <Box color="white" mt="2em" pl={["1em"]} pr={["1em"]}>
                    PositionManager Address:<br/>
                        <Link href='https://ropsten.etherscan.io/address/0xc6cb7f8c046756bd33ad6b322a3b88b0ca9cec1b'
                              target="_blank" style={{fontSize: "12px"}}>0xC6CB7f8c046756Bd33ad6b322a3b88B0CA9ceC1b
                            <FontAwesomeIcon icon={faUpRightFromSquare}/></Link><br/><br/>
                        DepositPool Address:<br/>
                        <Link href='https://ropsten.etherscan.io/address/0x3eFadc5E507bbdA54dDb4C290cc3058DA8163152'
                              target="_blank" style={{fontSize: "12px"}}>0x3eFadc5E507bbdA54dDb4C290cc3058DA8163152
                            <FontAwesomeIcon icon={faUpRightFromSquare}/></Link>
                </Box>
                <div style={{color: "white", marginTop: "2em"}}>
                    Visit hackthon project in&nbsp;
                    <Link href='https://dorahacks.io/buidl/2899' target="_blank"
                          style={{fontWeight: 1000 }} color="blue.400">
                        DoraHacks.io
                    </Link>
                </div><br/>
                <Heading
                    as="h3"
                    size="md"
                    lineHeight="tall"
                    color="white.500"
                    fontWeight="medium"
                >
                    <div style={{color: "white", marginTop: "1em"}}>Presented in&nbsp;
                        <Link href='https://www.activate.build/miami' target="_blank"
                        style={{fontWeight: 1000}} color="blue.400">Miami Activate x Wormhole</Link> Hackathon</div>
                </Heading><br/>
                <div style={{color: "white", marginTop: "1em"}}>
                    Go back to&nbsp;
                    <Link href='https://gammaswap.com' style={{fontWeight: 1000 }} color="blue.400">
                            www.GammaSwap.com
                    </Link>
                </div>
            </Box>
        </VStack>
    )

}
export default Home;