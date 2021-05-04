export type _PacketHandler<RequestData, RessponseData> = (
  (data: RequestData, cb: (data: RessponseData) => void) => void
);
