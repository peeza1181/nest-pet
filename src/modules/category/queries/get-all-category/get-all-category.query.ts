export class GetAllCategoryQuery {
  constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}
}
