export class CreatePetCommand {
  constructor(
    public readonly name: string,
    public readonly categoryId: number,
  ) {}
}
