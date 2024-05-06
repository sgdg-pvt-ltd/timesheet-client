import React, { useCallback, useState, useId } from 'react';

import { useCallbackRef } from './useCallbackRef';

export interface UseDisclosureProps {
	isOpen?: boolean;
	defaultIsOpen?: boolean;
	onClose?(): void;
	onOpen?(): void;
	id?: string;
}

type HTMLProps = React.HTMLAttributes<HTMLElement>;

/**
 * `useDisclosure` is a custom hook used to help handle common open, close, or toggle scenarios.
 * It can be used to control feedback component such as `Modal`, `Drawer`, etc.
 *
 *
 *  The useDisclosure hook returns an object with the following fields:
        Name	            Type	        Default	                    Description
        isOpen	            boolean	        false	                    If true, it sets the controlled component to its visible state.
        onClose	            function		Callback function           to set a falsy value for the isOpen parameter.
        onOpen	            function		Callback function           to set a truthy value for the isOpen parameter.
        onToggle	        function		Callback function           to toggle the value of the isOpen parameter.
        getDisclosureProps	function		Callback function           to retrieve a set of props for the controlled component.
        getButtonProps	    function		Callback function           to retrieve a set of props for the button that triggers the disclosure.
 *
 *
 */
export function useDisclosure(props: UseDisclosureProps = {}) {
	const { onClose: onCloseProp, onOpen: onOpenProp, isOpen: isOpenProp, id: idProp } = props;

	const handleOpen = useCallbackRef(onOpenProp);
	const handleClose = useCallbackRef(onCloseProp);

	const [isOpenState, setIsOpen] = useState(props.defaultIsOpen || false);

	const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState;

	const isControlled = isOpenProp !== undefined;

	const uid = useId();
	const id = idProp ?? `disclosure-${uid}`;

	const onClose = useCallback(() => {
		if (!isControlled) {
			setIsOpen(false);
		}
		handleClose?.();
	}, [isControlled, handleClose]);

	const onOpen = useCallback(() => {
		if (!isControlled) {
			setIsOpen(true);
		}
		handleOpen?.();
	}, [isControlled, handleOpen]);

	const onToggle = useCallback(() => {
		if (isOpen) {
			onClose();
		} else {
			onOpen();
		}
	}, [isOpen, onOpen, onClose]);

	function getButtonProps(props: HTMLProps = {}): HTMLProps {
		return {
			...props,
			'aria-expanded': isOpen,
			'aria-controls': id,
			onClick(event) {
				props.onClick?.(event);
				onToggle();
			},
		};
	}

	function getDisclosureProps(props: HTMLProps = {}): HTMLProps {
		return {
			...props,
			hidden: !isOpen,
			id,
		};
	}

	return {
		isOpen,
		onOpen,
		onClose,
		onToggle,
		isControlled,
		getButtonProps,
		getDisclosureProps,
	};
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>;
