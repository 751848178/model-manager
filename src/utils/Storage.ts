
class Storage {
    storage: any;
    constructor(type: "local" | "session" = "local") {
        if (type === "local") {
            this.storage = localStorage;
        } else if (type === "session") {
            this.storage = sessionStorage;
        }
    }

    /**
     * @description 设置本地储存
     * @param {string} key 储存的名字
     * @param {any} value 储存的值
     */
    set(key: string, value: any) {
        if (typeof value === "object") {
            try {
                value = JSON.stringify(value);
            } catch {
            }
        }
        this.storage.setItem(key, value);
    }

    /**
     * @description 获取本地储存的数据
     * @param {String} key 要获取的数据对应的名字
     * @return {String} 返回对应的数据
     */
    get(key: string) {
        let value = this.storage.getItem(key);
        try {
            value = JSON.parse(value);
        } catch {
        }
        return value;
    }

    /**
     * @description 删除本地储存中某些数据
     * @param {String} key 要删除的数据对应的名字
     */
    remove(key: string) {
        if (key) this.storage.removeItem(key);
    }

    /**
     * @description 清空本地储存的所有数据
     */
    clear() {
        this.storage.clear();
    }
}


const local = new Storage("local");
const session = new Storage("session");

export default {
    local,
    session,
}

export {
    local,
    session,
}