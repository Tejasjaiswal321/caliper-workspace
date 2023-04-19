'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

var arrId=[];
class MyWorkload extends WorkloadModuleBase {
    constructor() {
        super();
        arrId.length=5;// To be Kept same as total number of workers
        for(let i=0;i<arrId.length;i++) {
            arrId[i]=0;
        }
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        // for (let i=0; i<this.roundArguments.assets; i++) {
        //     const assetID = `${this.workerIndex}_${i}`;
        //     console.log(`Worker ${this.workerIndex}: Creating meter ${assetID}`);
        //     const request = {
        //         contractId: this.roundArguments.contractId,
        //         contractFunction: 'AddMeter',
        //         invokerIdentity: 'User1',
        //         contractArguments: [assetID,'as23df','500'],
        //         readOnly: false
        //     };
        //     await this.sutAdapter.sendRequests(request);
        // }
    }
    async submitTransaction() {
        const randomId=arrId[this.workerIndex]++;
        const assetId=`${this.workerIndex}_${randomId}`;
        // console.log(`Worker ${this.workerIndex}: Creating meter ${assetId}`);
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'AddMeter',
            invokerIdentity: 'User1',
            contractArguments: [`${assetId}`,"createdsec_par13e12e1212e","createdh_pk23e1ar23"],
            readOnly: false
        };
        await this.sutAdapter.sendRequests(myArgs);
    }


    async cleanupWorkloadModule() {
        //new change checking for 
        // depended CRUD benchmarking
        //uncomment for loop for removing dependency


        // for(let i=0;i<arrId[this.workerIndex];i++){
        //     const assetID = `${this.workerIndex}_${i}` ;
        //     console.log(`Worker ${this.workerIndex}: Deleting meter ${assetID}`);
        //     const request = {
        //         contractId: this.roundArguments.contractId,
        //         contractFunction: 'RemoveMeter',
        //         invokerIdentity: 'User1',
        //         contractArguments: [assetID],
        //         readOnly: false
        //     };

        //     await this.sutAdapter.sendRequests(request);
        // }
        
        
        // for (let i=0; i<this.roundArguments.assets; i++) {
        //     const assetID = `${this.workerIndex}_${i}`;
        //     console.log(`Worker ${this.workerIndex}: Deleting meter ${assetID}`);
        //     const request = {
        //         contractId: this.roundArguments.contractId,
        //         contractFunction: 'RemoveMeter',
        //         invokerIdentity: 'User1',
        //         contractArguments: [assetID],
        //         readOnly: false
        //     };

        //     await this.sutAdapter.sendRequests(request);
        // }
    }
}

function createWorkloadModule() {
    return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;