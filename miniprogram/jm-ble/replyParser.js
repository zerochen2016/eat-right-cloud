class ReplyParser {
  static POINT_PEF_PACKAGE = 4  // 每数据包的数据点数
  static POINT_BYTES = 3 // 每数据点的字节数

  static _REPLY_CMD_LENGTH = 19 // reply 的数据包长度

  // 指定期望的接收数据包数创建一个缓冲区（1个数据包包括4个数据点）
  static createPayloadBuffer(packetSize) {
    return new Uint8Array(packetSize * this.POINT_PEF_PACKAGE * this.POINT_BYTES)
  }

  constructor(bufferSize = 100) {
    console.log("Parser Buffer Size:", bufferSize)
    this._buffer = new Uint8Array(bufferSize);
    this._bufferSize = bufferSize;

    this._len = 0; // 实际数据长度
  }

  // 当前有效数据
  get data() {
    return this._buffer.slice(0, this._len)
  }

  // 有效数据的大小
  get size() {
    return this._len
  }

  // Public methods

  // 填充新的数据
  fill(data) {
    const len = data.length
    this._buffer.set(data, this._len)
    this._len = this._len + len
    
  }

  // 从当前缓存去中读取数据填充到 targetArray 之中
  readPayload(targetArray, offset) {
    let needShrink = false
    let readSize = 0
    let begin = 0
    let end = this._len

    while (true) {
      const data = this._buffer.slice(begin)
      const idx = data.findIndex(this._isPacket)
      if (idx < 0) {
        break
      }

      // 截取 payload 部分的数据
      // 从第5个字节开始取12个字节
      const payload = data.slice(idx + 4, idx + 16) // (4 to 4+12)
      targetArray.set(payload, offset + readSize)

      // 调整索引与长度
      begin = begin + idx + ReplyParser._REPLY_CMD_LENGTH
      readSize = readSize + payload.length
      needShrink = true

    }

    if (needShrink) {
      const left = this._buffer.slice(begin, end)
      this._shrink(left)
    }

    return readSize
  }

  // 重置
  reset() {
    this._buffer.fill(0)
  }

  // Private methods

  // 收缩数据
  _shrink(data) {
    this._buffer = new Uint8Array(this._bufferSize)
    this._len = 0

    if (data.length > 0) {
      this.fill(data)
    }
  }

  // 是否是一个脉诊测量数据包
  _isPacket(element, index, array) {
    // Packet:
    //  SOI(0x4e 0x51) CMD(0x03) LEN(0x13) PAYLOAD(12 Bytes) SEQ(1 Byte) CHECKSUM(1 Byte) EOI(0x5A)
    const len = array.length;

    if (
      element === 0x4e && // SOI
      (index + 1 < len && array[index + 1] === 0x51) && // SOI
      (index + 2 < len && array[index + 2] === 0x03) && // CMD
      (index + 3 < len && array[index + 3] === 0x13) && // LEN
      (array[index + 19 - 1] === 0x5a) // EOI
    ) {
      return true;
    }

    return false;
  }


}

export default ReplyParser
