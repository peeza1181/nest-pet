export class GetAllPetsPaginationQuery {
  constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}
}
