import { useMemo, useState } from 'react';

type InitialState = boolean | (() => boolean);

/**
 * React hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 *
 *  The useBoolean hook returns a stateful boolean value and an object with the following function to update it:
        Name	Type	        Description
        on	    () => void	    A function to set the boolean value to true.
        off	    () => void	    A function to set the boolean value to false.
        toggle	() => void	    A function to negate the boolean state.
 *
 *
 */
export function useBoolean(initialState: InitialState = false) {
	const [value, setValue] = useState(initialState);
	const callbacks = useMemo(
		() => ({
			on: () => setValue(true),
			off: () => setValue(false),
			toggle: () => setValue((prev) => !prev),
		}),
		[],
	);
	return [value, callbacks] as const;
}
