export class RecipeDifficultyModel {
  id: number;
  label = '';

  public isNotMentioned() {
    return this.label.toLowerCase() === 'non mentionné';
  }

  public isVeryEasy() {
    return this.label.toLowerCase() === 'très facile';
  }

  public isEasy() {
    return this.label.toLowerCase() === 'facile';
  }

  public isIntermediate() {
    return this.label.toLowerCase() === 'intermédiaire';
  }

  public isAdvanced() {
    return this.label.toLowerCase() === 'avancé';
  }

  public isExpert() {
    return this.label.toLowerCase() === 'expert';
  }
}
