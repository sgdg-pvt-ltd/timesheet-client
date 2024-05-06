import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useBoolean } from './useBoolean';

describe('useBoolean', () => {
	it(`This will on/off the toggle which makes true/false`, () => {
		const { result } = renderHook(() => useBoolean());
		act(() => {
			result.current[1].on();
		});
		expect(result.current[0]).toBe(true);

		act(() => {
			result.current[1].off();
		});
		expect(result.current[0]).toBe(false);
	});
});
