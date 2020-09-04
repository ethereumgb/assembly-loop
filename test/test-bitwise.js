const assert = require('assert');
const BN = require('bn.js');

const BitWise = artifacts.require('BitWise');

contract("BitWise", () =>{
    let bitwise;
   before(() => {
        return BitWise.deployed().then(instance => {
            bitwise = instance;
        })
    })

    it('countBitSet() should pass', async () => {
        const myNumber = 250;
        const gas = await bitwise.countBitSet.estimateGas(myNumber);
        const gasAsm = await bitwise.countBitSetAsm.estimateGas(myNumber);
        assert.ok(new BN(gasAsm).gt(gas), "Assembly should be more gas efficient");

        const result = await bitwise.countBitSet(myNumber);
        const resultAsm = await bitwise.countBitSetAsm(myNumber);
        assert.ok(new BN(result).eq(resultAsm), "result should match");
    })
})
