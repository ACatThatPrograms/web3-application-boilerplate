import ethAdapter from './ethAdapter.js';

export async function ATOKEN_function_allowMigration_nonpayable_IN0_OUT0() {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("ATOKEN");
		const response = await contractInstance["allowMigration"]();
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_allowMigration_nonpayable_IN0_OUT0.params = [];

export async function ATOKEN_function_allowance_view_IN2_OUT1({owner_address, spender_address}) {
	try {
		let contractInstance = ethAdapter._getReadonlyContractInstance("ATOKEN");
		const response = await contractInstance["allowance"](owner_address, spender_address);
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_allowance_view_IN2_OUT1.params = [
	{name:"owner",type:"address"},
	{name:"spender",type:"address"}
];

export async function ATOKEN_function_approve_nonpayable_IN2_OUT1({spender_address, amount_uint256}) {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("ATOKEN");
		const response = await contractInstance["approve"](spender_address, amount_uint256);
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_approve_nonpayable_IN2_OUT1.params = [
	{name:"spender",type:"address"},
	{name:"amount",type:"uint256"}
];

export async function ATOKEN_function_balanceOf_view_IN1_OUT1({account_address}) {
	try {
		let contractInstance = ethAdapter._getReadonlyContractInstance("ATOKEN");
		const response = await contractInstance["balanceOf"](account_address);
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_balanceOf_view_IN1_OUT1.params = [
	{name:"account",type:"address"}
];

export async function ATOKEN_function_convert_view_IN1_OUT1({amount_uint256}) {
	try {
		let contractInstance = ethAdapter._getReadonlyContractInstance("ATOKEN");
		const response = await contractInstance["convert"](amount_uint256);
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_convert_view_IN1_OUT1.params = [
	{name:"amount",type:"uint256"}
];

export async function ATOKEN_function_decimals_view_IN0_OUT1() {
	try {
		let contractInstance = ethAdapter._getReadonlyContractInstance("ATOKEN");
		const response = await contractInstance["decimals"]();
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_decimals_view_IN0_OUT1.params = [];

export async function ATOKEN_function_decreaseAllowance_nonpayable_IN2_OUT1({spender_address, subtractedValue_uint256}) {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("ATOKEN");
		const response = await contractInstance["decreaseAllowance"](spender_address, subtractedValue_uint256);
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_decreaseAllowance_nonpayable_IN2_OUT1.params = [
	{name:"spender",type:"address"},
	{name:"subtractedValue",type:"uint256"}
];

export async function ATOKEN_function_externalBurn_nonpayable_IN2_OUT0({from_address, amount_uint256}) {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("ATOKEN");
		const response = await contractInstance["externalBurn"](from_address, amount_uint256);
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_externalBurn_nonpayable_IN2_OUT0.params = [
	{name:"from",type:"address"},
	{name:"amount",type:"uint256"}
];

export async function ATOKEN_function_externalMint_nonpayable_IN2_OUT0({to_address, amount_uint256}) {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("ATOKEN");
		const response = await contractInstance["externalMint"](to_address, amount_uint256);
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_externalMint_nonpayable_IN2_OUT0.params = [
	{name:"to",type:"address"},
	{name:"amount",type:"uint256"}
];

export async function ATOKEN_function_getLegacyTokenAddress_view_IN0_OUT1() {
	try {
		let contractInstance = ethAdapter._getReadonlyContractInstance("ATOKEN");
		const response = await contractInstance["getLegacyTokenAddress"]();
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_getLegacyTokenAddress_view_IN0_OUT1.params = [];

export async function ATOKEN_function_increaseAllowance_nonpayable_IN2_OUT1({spender_address, addedValue_uint256}) {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("ATOKEN");
		const response = await contractInstance["increaseAllowance"](spender_address, addedValue_uint256);
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_increaseAllowance_nonpayable_IN2_OUT1.params = [
	{name:"spender",type:"address"},
	{name:"addedValue",type:"uint256"}
];

export async function ATOKEN_function_initialize_nonpayable_IN0_OUT0() {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("ATOKEN");
		const response = await contractInstance["initialize"]();
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_initialize_nonpayable_IN0_OUT0.params = [];

export async function ATOKEN_function_migrate_nonpayable_IN1_OUT0({amount_uint256}) {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("ATOKEN");
		const response = await contractInstance["migrate"](amount_uint256);
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_migrate_nonpayable_IN1_OUT0.params = [
	{name:"amount",type:"uint256"}
];

export async function ATOKEN_function_name_view_IN0_OUT1() {
	try {
		let contractInstance = ethAdapter._getReadonlyContractInstance("ATOKEN");
		const response = await contractInstance["name"]();
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_name_view_IN0_OUT1.params = [];

export async function ATOKEN_function_symbol_view_IN0_OUT1() {
	try {
		let contractInstance = ethAdapter._getReadonlyContractInstance("ATOKEN");
		const response = await contractInstance["symbol"]();
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_symbol_view_IN0_OUT1.params = [];

export async function ATOKEN_function_toggleMultiplierOff_nonpayable_IN0_OUT0() {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("ATOKEN");
		const response = await contractInstance["toggleMultiplierOff"]();
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_toggleMultiplierOff_nonpayable_IN0_OUT0.params = [];

export async function ATOKEN_function_toggleMultiplierOn_nonpayable_IN0_OUT0() {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("ATOKEN");
		const response = await contractInstance["toggleMultiplierOn"]();
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_toggleMultiplierOn_nonpayable_IN0_OUT0.params = [];

export async function ATOKEN_function_totalSupply_view_IN0_OUT1() {
	try {
		let contractInstance = ethAdapter._getReadonlyContractInstance("ATOKEN");
		const response = await contractInstance["totalSupply"]();
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_totalSupply_view_IN0_OUT1.params = [];

export async function ATOKEN_function_transfer_nonpayable_IN2_OUT1({to_address, amount_uint256}) {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("ATOKEN");
		const response = await contractInstance["transfer"](to_address, amount_uint256);
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_transfer_nonpayable_IN2_OUT1.params = [
	{name:"to",type:"address"},
	{name:"amount",type:"uint256"}
];

export async function ATOKEN_function_transferFrom_nonpayable_IN3_OUT1({from_address, to_address, amount_uint256}) {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("ATOKEN");
		const response = await contractInstance["transferFrom"](from_address, to_address, amount_uint256);
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
ATOKEN_function_transferFrom_nonpayable_IN3_OUT1.params = [
	{name:"from",type:"address"},
	{name:"to",type:"address"},
	{name:"amount",type:"uint256"}
];

export async function STORAGE_function_retrieve_view_IN0_OUT1() {
	try {
		let contractInstance = ethAdapter._getReadonlyContractInstance("STORAGE");
		const response = await contractInstance["retrieve"]();
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
STORAGE_function_retrieve_view_IN0_OUT1.params = [];

export async function STORAGE_function_store_nonpayable_IN1_OUT0({num_uint256}) {
	try {
		let contractInstance = ethAdapter._getSignerContractInstance("STORAGE");
		const response = await contractInstance["store"](num_uint256);
		return response;
	} catch(ex) { 
		return { error: ex.message }
	}
}
STORAGE_function_store_nonpayable_IN1_OUT0.params = [
	{name:"num",type:"uint256"}
];

const contractMethods = {
	ATOKEN: {
		allowMigration_nonpayable:ATOKEN_function_allowMigration_nonpayable_IN0_OUT0,
		allowance_view:ATOKEN_function_allowance_view_IN2_OUT1,
		approve_nonpayable:ATOKEN_function_approve_nonpayable_IN2_OUT1,
		balanceOf_view:ATOKEN_function_balanceOf_view_IN1_OUT1,
		convert_view:ATOKEN_function_convert_view_IN1_OUT1,
		decimals_view:ATOKEN_function_decimals_view_IN0_OUT1,
		decreaseAllowance_nonpayable:ATOKEN_function_decreaseAllowance_nonpayable_IN2_OUT1,
		externalBurn_nonpayable:ATOKEN_function_externalBurn_nonpayable_IN2_OUT0,
		externalMint_nonpayable:ATOKEN_function_externalMint_nonpayable_IN2_OUT0,
		getLegacyTokenAddress_view:ATOKEN_function_getLegacyTokenAddress_view_IN0_OUT1,
		increaseAllowance_nonpayable:ATOKEN_function_increaseAllowance_nonpayable_IN2_OUT1,
		initialize_nonpayable:ATOKEN_function_initialize_nonpayable_IN0_OUT0,
		migrate_nonpayable:ATOKEN_function_migrate_nonpayable_IN1_OUT0,
		name_view:ATOKEN_function_name_view_IN0_OUT1,
		symbol_view:ATOKEN_function_symbol_view_IN0_OUT1,
		toggleMultiplierOff_nonpayable:ATOKEN_function_toggleMultiplierOff_nonpayable_IN0_OUT0,
		toggleMultiplierOn_nonpayable:ATOKEN_function_toggleMultiplierOn_nonpayable_IN0_OUT0,
		totalSupply_view:ATOKEN_function_totalSupply_view_IN0_OUT1,
		transfer_nonpayable:ATOKEN_function_transfer_nonpayable_IN2_OUT1,
		transferFrom_nonpayable:ATOKEN_function_transferFrom_nonpayable_IN3_OUT1
	},
	STORAGE: {
		retrieve_view:STORAGE_function_retrieve_view_IN0_OUT1,
		store_nonpayable:STORAGE_function_store_nonpayable_IN1_OUT0
	}
}

export default contractMethods;