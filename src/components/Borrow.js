import React, { useState, useEffect } from 'react'
import { BigNumber, constants } from 'ethers'
import { useForm } from 'react-hook-form';
import * as Web3 from "web3/dist/web3.min.js";
import IUniswapV2Pair from '../abis/IUniswapV2Pair.json';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    Box
} from '@chakra-ui/react'

const ZEROMIN = 0;

function Borrow({ account, token0, token1, posManager }) {
    const [ liq1InTokB, setLiq1InTokB] = useState("0");
    const [ liq2InTokB, setLiq2InTokB] = useState("0");
    const [ posId, setPosId] = useState("");
    const [ balInTokB, setBalInTokB] = useState("0");
    const [ uniPrice, setUniPrice] = useState("0");
    const [ pos, setPos] = useState({});
    const { register, handleSubmit } = useForm();
    const { register: register2, handleSubmit: handleSubmit2 } = useForm();

    function pretty(num) {
        return parseFloat(Web3.utils.fromWei(num).toString()).toFixed(2);
    }

    function sqrt(y){
        let z;
        if (y.gt(3)) {
            z = y;
            let x = (y.div(2)).add(1);
            while (x.lt(z)) {
                z = x;
                x = ((y.div(x)).add(x)).div(2);
            }
        } else if (!y.isZero()) {
            z = BigNumber.from(1);
        }
        return z;
    }

    useEffect(() => {
        async function fetchData() {
            if(posManager && posManager.methods) {
                const positionCount = await posManager.methods.positionCountByOwner(account).call();
                const positions = await posManager.methods.getPositionsByOwner(account).call();
                if(positionCount > 0) {
                    const position = await posManager.methods.positions(positionCount).call();
                    setPos(position);
                    setPosId(positionCount.toString());
                    const uniPair = position.uniPair;
                    const uniPairContract = new web3.eth.Contract(IUniswapV2Pair.abi, uniPair);
                    const reserves = await uniPairContract.methods.getReserves().call();
                    const price = BigNumber.from(reserves.reserve1).mul(BigNumber.from(10).pow(18)).div(reserves.reserve0);
                    setUniPrice(price.toString());
                    const _uniPrice = BigNumber.from(price.toString());
                    if(_uniPrice.gt(constants.Zero)){
                        const ONE = BigNumber.from(10).pow(18);
                        const squarePrice = sqrt(_uniPrice.mul(ONE));
                        const squarePrice2 = BigNumber.from(squarePrice.toString());
                        const posLiquidity = BigNumber.from(position.liquidity.toString());
                        const bal = (squarePrice2.mul(posLiquidity).div(ONE)).mul(2);
                        setBalInTokB(pretty(bal.toString()));
                    }
                }
            }

        }
        fetchData();
    }, [posManager]);

    async function openPositionHandler({ token0Amt, token1Amt, liquidity }) {

        const token0Allowance = await checkAllowance(account, token0);
        if (token0Allowance <= 0) {
            await approve(token0, posManager._address)
        }

        const token1Allowance = await checkAllowance(account, token1);
        if (token1Allowance <= 0) {
            await approve(token1, posManager._address)
        }

        // TODO
        const createPosition = await posManager.methods.openPosition(
            token0.address,
            token1.address,
            Web3.utils.toWei(token0Amt, "ether"),
            Web3.utils.toWei(token1Amt, "ether"),
            Web3.utils.toWei(liquidity, "ether"),
            account,  
        ).send({ from: account });
    }

    async function checkAllowance(account, token) {
        if (token.symbol) console.log(token.symbol);
        const allowedAmt = await token
            .contract
            .methods
            .allowance(account, posManager._address)
            .call();
        /*.then(res => {
         return res
         })
         .catch(err => {
         console.error(err)
         })/**/
        return allowedAmt;
    }

    async function approve(fromToken, toAddr) {
        const res = await fromToken.contract.methods.approve(toAddr, constants.MaxUint256).send({ from: account });
    }

    function handleLiq1Chng(evt) {
        const _uniPrice = BigNumber.from(uniPrice.toString());
        if(evt.length > 0 && _uniPrice.gt(constants.Zero)){
            const liq = BigNumber.from(evt.toString());
            setLiq1InTokB(pretty(sqrt(_uniPrice.mul(BigNumber.from(10).pow(18))).mul(liq).mul(2).toString()));
        } else {
            setLiq1InTokB("0");
        }
    }

    function handleLiq2Chng(evt) {
        const _uniPrice = BigNumber.from(uniPrice.toString());
        if(evt.length > 0 && _uniPrice.gt(constants.Zero)){
            const liq = BigNumber.from(evt.toString());
            setLiq2InTokB(pretty(sqrt(_uniPrice.mul(BigNumber.from(10).pow(18))).mul(liq).mul(2).toString()));
        } else {
            setLiq2InTokB("0");
        }
    }

    async function repayHandler({ repayLiquidity }) {
        const res = await posManager.methods.decreasePosition(posId,
            Web3.utils.toWei(repayLiquidity.toString(), "ether")).send({ from: account });
    }

    return (
        <>
            <Box borderRadius={'3xl'} bg={'#1d2c52'} boxShadow='dark-lg' style={{textAlign: "center"}}>
                <form onSubmit={handleSubmit(openPositionHandler)}>
                    <FormControl p={14}>
                        <Heading marginBottom={'25px'}
                            color={'#e2e8f0'}
                        >
                            Open Loan
                        </Heading>
                        <FormLabel
                        color={'#e2e8f0'}
                        fontSize={'md'}
                        fontWeight={'semibold'}
                        htmlFor='token0'
                        >
                            Collateral {token0.symbol}
                        </FormLabel>
                        <Input
                            color={'#e2e8f0'}
                            placeholder='amount'
                            color={'#e2e8f0'}
                            id='token0'
                            type='number'
                            {...register('token0Amt')}
                        />
                        <FormLabel
                        color={'#e2e8f0'}
                        mt={5}
                        fontSize={'md'}
                        fontWeight={'semibold'}
                        htmlFor='token1'
                        >
                            Collateral {token1.symbol}
                        </FormLabel>
                        <Input
                            color={'#e2e8f0'}
                            placeholder='amount'
                            color={'#e2e8f0'}
                            id='token1'
                            type='number'
                            {...register('token1Amt')}
                        />
                        <FormLabel
                            color={'#e2e8f0'}
                            fontSize={'md'}
                            fontWeight={'semibold'}
                            mt={5}
                            htmlFor='liquidity'
                        >
                            Liquidity ({liq1InTokB} {token1 ? token1.symbol : "" })
                        </FormLabel>
                        <Input
                            color={'#e2e8f0'}
                            placeholder='amount'
                            color={'#e2e8f0'}
                            id='liquidity'
                            type='number'
                            {...register('liquidity')}
                            onChange={e => handleLiq1Chng(e.target.value)}
                        />
                        <Button
                            mt={10}
                            bgColor='#2563eb'
                            color='#e2e8f0'
                            type='submit'
                        >
                            Submit
                        </Button>
                    </FormControl>
                </form>
                <Heading  as='h5' fontFamily="body" size='md' color={'#e2e8f0'}
                    style={{textAlign: "center"}}>Balance: {balInTokB} {token1 ? token1.symbol : ""}</Heading>
                <Heading  as='h5' fontFamily="body" size='md' color={'#e2e8f0'}
                    style={{textAlign: "center"}}>Liquidity: {pos.liquidity ? pretty(pos.liquidity) : 0} </Heading>
                <form onSubmit={handleSubmit2(repayHandler)}>
                    <FormControl p={14} boxShadow='lg' mt={10}>
                        <Heading color={'#e2e8f0'} marginBottom={'25px'}>Repay Loan</Heading>
                        <FormLabel
                            color={'#e2e8f0'}
                            fontSize={'md'}
                            fontWeight={'semibold'}
                            mt={5}
                            htmlFor='repayLiquidity'
                        >
                            Liquidity ({liq2InTokB} {token1 ? token1.symbol : "" })
                        </FormLabel>
                            <Input
                                id='repayLiquidity'
                                placeholder='amount'
                                color={'#e2e8f0'}
                                type='number'
                                {...register2('repayLiquidity')}
                                onChange={e => handleLiq2Chng(e.target.value)}
                            />
                        <Button
                            my={5}
                            bgColor='#2563eb'
                            color='#e2e8f0'
                            type='submit'
                        >
                            Submit
                        </Button>
                    </FormControl>
                </form>
            </Box>
        </>
    );

}
export default Borrow;