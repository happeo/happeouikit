import { ACTIONS, EVENTS } from "./constants";

class Toast {
  createEvent(eventType, detail = {}) {
    return new CustomEvent(eventType, {
      bubbles: true,
      detail
    });
  }

  /**
   * @param {Object} detail
   * @property {String }message
   * @property  {Function} undo
   * @property {String} undoText
   */
  default(detail) {
    const event = this.createEvent(EVENTS.SHOW, detail);
    return window.dispatchEvent(event);
  }

  success(params) {
    return this.default({ type: ACTIONS.SUCCESS, ...params });
  }

  error(params) {
    return this.default({ type: ACTIONS.ERROR, ...params });
  }

  hide() {
    const event = this.createEvent(EVENTS.HIDE);
    return window.dispatchEvent(event);
  }
}

export const toast = new Toast();
