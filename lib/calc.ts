export type AttackMode = "direct" | "friend";

export type CalcInput = {
  mode: AttackMode;
  basePower: number;
  bonus: number;
  friendYuugeki: number;
  gauge: boolean;
  superAdw: boolean;
  killerRate: number;
  killerEnabled: boolean;
  stageRate: number;
  weakRate: number;
  weakEnabled: boolean;
  weakHits: number;
  bodyRate: number;
  bodyHits: number;
};

export type CalcOutput = {
  actualAttack: number;
  totalDamage: number;
  breakdown: Array<{ name: string; val: string }>;
};

export function computeDamage(input: CalcInput): CalcOutput {
  const breakdown: Array<{ name: string; val: string }> = [];
  const base = Math.max(0, input.basePower || 0);
  const bonus = Math.max(0, input.bonus || 0);
  const yuugeki = Math.max(1, input.friendYuugeki || 1);

  let attack = 0;
  if (input.mode === "direct") {
    attack = base + bonus;
    breakdown.push({ name: "攻撃力", val: `${base.toLocaleString()} + ${bonus.toLocaleString()}` });
  } else {
    attack = Math.floor(base * yuugeki);
    breakdown.push({ name: "友情威力", val: `${base.toLocaleString()} × ${yuugeki}` });
  }

  let common = attack;
  if (input.gauge) {
    common = Math.floor(common * 1.2);
    breakdown.push({ name: "ゲージ", val: "×1.2" });
  }
  if (input.superAdw) {
    common = Math.floor(common * 1.3);
    breakdown.push({ name: "超ADW", val: "×1.3" });
  }
  if (input.killerEnabled) {
    const r = Math.max(1, input.killerRate || 1);
    common = Math.floor(common * r);
    breakdown.push({ name: "キラー", val: `×${r}` });
  }

  const stage = Math.max(0.1, input.stageRate || 1);
  common = Math.floor(common * stage);
  breakdown.push({ name: "属性倍率", val: `×${stage}` });

  const bodyHits = Math.max(0, Math.floor(input.bodyHits || 0));
  const weakHits = Math.max(0, Math.floor(input.weakHits || 0));
  const bodyRate = Math.max(0, input.bodyRate || 1);
  const weakRate = input.weakEnabled ? Math.max(0, input.weakRate || 3) : 1;

  const bodyDamage = Math.floor(common * bodyRate) * bodyHits;
  const weakDamage = Math.floor(common * weakRate) * weakHits;
  const totalDamage = bodyDamage + weakDamage;

  breakdown.push({ name: "本体", val: `${Math.floor(common * bodyRate).toLocaleString()} × ${bodyHits}hit` });
  breakdown.push({ name: "弱点", val: `${Math.floor(common * weakRate).toLocaleString()} × ${weakHits}hit` });

  return { actualAttack: attack, totalDamage, breakdown };
}

export function judgeOneShot(totalDamage: number, enemyHp: number, reductionRate: number) {
  const hp = Math.max(0, Math.floor(enemyHp || 0));
  const reduction = Math.min(0.99, Math.max(0, reductionRate || 0));
  const realHp = Math.floor(hp * (1 - reduction));
  const success = totalDamage >= realHp;
  return { realHp, success };
}
