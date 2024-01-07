import * as React from 'react';
import NavItems from './NavItems';
import {
    Box,
    Flex,
    Button,
    Collapse,
    Icon,
    IconButton,
    Stack,
    Text,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';

import {
    HiMenu,
    HiX,
    HiChevronDown
} from 'react-icons/hi';


const Navbar = (props) => {
    const { isOpen, onToggle } = useDisclosure();
    const logoColor = useColorModeValue("gray.100", "gray.100")
    return (
        <Box>
            <Flex
                color={useColorModeValue("gray.600", "white")}
                py={{ base: 2 }}
                px={{ base: 4 }}
            >
                <Flex
                    flex={{ base: 1, md: "auto" }}
                    ml={{ base: -2 }}
                    display={{ base: "flex", md: "none" }}
                >
                    <IconButton
                        onClick={onToggle}
                        colorScheme={"purple"}
                        icon={
                            isOpen ? (
                                <Icon as={HiX} color={"gray.100"} _hover={{ color: "gray.700" }} w={5} h={5} />
                            ) : (
                                <Icon as={HiMenu} color={"gray.100"} _hover={{ color: "gray.700" }} w={5} h={5} />
                            )
                        }
                        variant={"ghost"}
                        aria-label={"Toggle Navigation"}
                    />
                </Flex>

                <Flex
                    minH={'60px'}
                    py={{ base: 2 }}
                    px={{ base: 4 }}
                    align={'center'}
                    style={{width: "100%"}}>
                    <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                            <DesktopNav />
                        </Flex>
                    </Flex>
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}>
                        { <Button
                            display={{ md: 'inline-flex' }}
                            fontSize={'lg'}
                            fontWeight={700}
                            color={'#e2e8f0'}
                            bg={'#2563eb'}
                            href={'#'}
                            _hover={{
                                bg: '#3b82f6',
                            }}>
                            {props.account !== props.account ? "Connect Wallet" : props.account}
                        </Button>}
                    </Stack>
                </Flex>

            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav account={props.account}/>
            </Collapse>
        </Box>
    );
}

const MobileNavItem = ({ label, children, href, target }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? "#"}
                target={target ?? ""}
                justify={"space-between"}
                align={"center"}
                _hover={{
                    textDecoration: "none",
                }}
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue("gray.100", "gray.200")}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={HiChevronDown}
                        transition={"all .25s ease-in-out"}
                        transform={isOpen ? "rotate(180deg)" : ""}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse
                in={isOpen}
                animateOpacity
                style={{ marginTop: "0!important" }}
            >
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.100", "gray.700")}
                    align={"start"}
                >
                    {children &&
                    children.map((child) => (
                        <Link key={child.label} py={2} href={child.href}  target={child.target}>
                            {child.label}
                        </Link>
                    ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};


const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue("gray.800", "gray.800")}
            p={4}
            display={{ md: "none" }}
        >
            {NavItems.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const DesktopNav = () => {
    const linkColor = useColorModeValue('#e2e8f0', 'gray.200');
    const linkHoverColor = useColorModeValue('#f1f5f9', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NavItems.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                target={navItem.target ?? ''}
                                fontSize={'lg'}
                                fontWeight={700}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>
                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

export default Navbar