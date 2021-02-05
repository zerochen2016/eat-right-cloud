class CommandBuilder {
  static EOI = 0x5a // 结束字节

  // 指定接收数据包数并开始测量（1个数据包包括4个数据点）
  static startPulseTest(packetSize) {
    const COMM = 0x03 // 命令字节
    const LENGTH = 0x08 // 命令长度

    const sizeL = packetSize & 0xFF // size 的低位
    const sizeH = (packetSize >> 8) & 0xFF // size 的高位

    // 计算 CHECKSUM
    let CHECKSUM = COMM + LENGTH + sizeL + sizeH
    CHECKSUM &= 0xff;
    CHECKSUM = ~CHECKSUM & 0xff;

    const cmd = new Uint8Array([0x4e, 0x51, COMM, LENGTH, sizeL, sizeH, CHECKSUM, this.EOI])
    return cmd
  }
}

export default CommandBuilder