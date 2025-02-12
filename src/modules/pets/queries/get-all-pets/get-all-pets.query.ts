export class GetAllPetsQuery {
  constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}
}
