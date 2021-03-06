import { Evented } from '@dojo/core/Evented';
import { EventObject } from '@dojo/core/interfaces';
import Map from '@dojo/shim/Map';
import { NodeHandlerInterface } from './interfaces';

/**
 * Enum to identify the type of event.
 * Listening to 'Projector' will notify when projector is created or updated
 * Listening to 'Widget' will notify when widget root is created or updated
 */
export enum NodeEventType {
	Projector = 'Projector',
	Widget = 'Widget'
}

export interface NodeHandlerEventMap {
	Projector: EventObject<NodeEventType.Projector>;
	Widget: EventObject<NodeEventType.Widget>;
}

export class NodeHandler extends Evented<NodeHandlerEventMap> implements NodeHandlerInterface {
	private _nodeMap = new Map<string, Element>();

	public get(key: string): Element | undefined {
		return this._nodeMap.get(key);
	}

	public has(key: string): boolean {
		return this._nodeMap.has(key);
	}

	public add(element: Element, key: string): void {
		this._nodeMap.set(key, element);
		this.emit({ type: key });
	}

	public addRoot(): void {
		this.emit({ type: NodeEventType.Widget });
	}

	public addProjector(): void {
		this.emit({ type: NodeEventType.Projector });
	}

	public clear(): void {
		this._nodeMap.clear();
	}
}

export default NodeHandler;
