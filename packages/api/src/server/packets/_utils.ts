export type _PacketHandler<RequestData, ResponseData> = (
  (data: RequestData, cb: (data: ResponseData) => void) => void
);
