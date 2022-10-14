import ethAdapter from './ethAdapter.js';

export async function STORAGE_function_retrieve_view_IN0_OUT1() {
	try {
		let contractInstance = ethAdapter._getReadonlyContractInstance("STORAGE");
		const response = await contractInstance["retrieve"]();
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}

export async function STORAGE_function_store_nonpayable_IN1_OUT0(num_uint256) {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("STORAGE");
		const response = await contractInstance["store"](num_uint256);
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}

export default {
	STORAGE: {
		retrieve_view:STORAGE_function_retrieve_view_IN0_OUT1,
		store_nonpayable:STORAGE_function_store_nonpayable_IN1_OUT0
	}
}