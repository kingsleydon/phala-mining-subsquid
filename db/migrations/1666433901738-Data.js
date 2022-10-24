module.exports = class Data1666433901738 {
  name = 'Data1666433901738'

  async up(db) {
    await db.query(`CREATE TABLE "global_state" ("id" character varying NOT NULL, "height" integer NOT NULL, "total_stake" numeric NOT NULL, "last_recorded_block_height" integer NOT NULL, "last_recorded_block_time" TIMESTAMP WITH TIME ZONE NOT NULL, "average_block_time" integer NOT NULL, "mining_worker_share" numeric NOT NULL, CONSTRAINT "PK_8b4db1150cf49bfd067e2572c74" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "tokenomic_parameters" ("id" character varying NOT NULL, "pha_rate" numeric NOT NULL, "budget_per_block" numeric NOT NULL, "v_max" numeric NOT NULL, "treasury_ratio" numeric NOT NULL, "re" numeric NOT NULL, "k" numeric NOT NULL, CONSTRAINT "PK_ab3b74e4e742bdc94ef7eb0364a" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "stake_pool_stake" ("id" character varying NOT NULL, "amount" numeric NOT NULL, "shares" numeric NOT NULL, "reward" numeric NOT NULL, "withdrawal_amount" numeric NOT NULL, "withdrawal_shares" numeric NOT NULL, "withdrawal_start_time" TIMESTAMP WITH TIME ZONE, "account_id" character varying, "stake_pool_id" character varying, CONSTRAINT "PK_eaa9ca64af6d63f5fe7e375063f" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_07bc33fb01c008a2251f20bdab" ON "stake_pool_stake" ("account_id") `)
    await db.query(`CREATE INDEX "IDX_5647459f5175b49a3eb5a53a43" ON "stake_pool_stake" ("stake_pool_id") `)
    await db.query(`CREATE TABLE "miner" ("id" character varying NOT NULL, "is_bound" boolean NOT NULL, "stake" numeric NOT NULL, "state" character varying(18) NOT NULL, "v" numeric NOT NULL, "ve" numeric NOT NULL, "p_init" integer NOT NULL, "p_instant" integer NOT NULL, "total_reward" numeric NOT NULL, "cooling_down_start_time" TIMESTAMP WITH TIME ZONE, "stake_pool_id" character varying, "worker_id" character varying, CONSTRAINT "PK_7a55ae970127603da69bf5b7f8a" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_737c656afd5d25141ddadb45dc" ON "miner" ("stake_pool_id") `)
    await db.query(`CREATE INDEX "IDX_0284dfdd12d2bb6d6519561f4e" ON "miner" ("worker_id") `)
    await db.query(`CREATE TABLE "worker" ("id" character varying NOT NULL, "confidence_level" integer NOT NULL, "initial_score" integer, "s_min" numeric, "s_max" numeric, "share" numeric, "stake_pool_id" character varying, "miner_id" character varying, CONSTRAINT "PK_dc8175fa0e34ce7a39e4ec73b94" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_81caea9d964ee3c0338fd44db4" ON "worker" ("stake_pool_id") `)
    await db.query(`CREATE INDEX "IDX_adf8f5be7722a6cac072b470f1" ON "worker" ("miner_id") `)
    await db.query(`CREATE TABLE "stake_pool_whitelist" ("id" character varying NOT NULL, "create_time" TIMESTAMP WITH TIME ZONE NOT NULL, "account_id" character varying, "stake_pool_id" character varying, CONSTRAINT "PK_086976acf4228b15dbfbf1be919" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_c07d6ab7536f049b3554ca40b8" ON "stake_pool_whitelist" ("account_id") `)
    await db.query(`CREATE INDEX "IDX_20a4bdc9d90cd0b746cf53e897" ON "stake_pool_whitelist" ("stake_pool_id") `)
    await db.query(`CREATE TABLE "stake_pool" ("id" character varying NOT NULL, "pid" numeric NOT NULL, "commission" numeric NOT NULL, "capacity" numeric, "delegable" numeric, "free_stake" numeric NOT NULL, "releasing_stake" numeric NOT NULL, "total_stake" numeric NOT NULL, "total_shares" numeric NOT NULL, "owner_reward" numeric NOT NULL, "active_stake_count" integer NOT NULL, "worker_count" integer NOT NULL, "mining_worker_count" integer NOT NULL, "mining_worker_share" numeric NOT NULL, "apr_base" numeric NOT NULL, "total_withdrawal" numeric NOT NULL, "whitelist_enabled" boolean NOT NULL, "owner_id" character varying, CONSTRAINT "PK_646d137a2979aa231fa880711f3" PRIMARY KEY ("id"))`)
    await db.query(`CREATE UNIQUE INDEX "IDX_c8c9190df77c9651929d6d23e2" ON "stake_pool" ("pid") `)
    await db.query(`CREATE INDEX "IDX_9dc40c97caad68a3c0a6b9ee71" ON "stake_pool" ("owner_id") `)
    await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "total_stake" numeric NOT NULL, "total_stake_reward" numeric NOT NULL, "total_owner_reward" numeric NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "stake_pool_stake" ADD CONSTRAINT "FK_07bc33fb01c008a2251f20bdab2" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "stake_pool_stake" ADD CONSTRAINT "FK_5647459f5175b49a3eb5a53a433" FOREIGN KEY ("stake_pool_id") REFERENCES "stake_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "miner" ADD CONSTRAINT "FK_737c656afd5d25141ddadb45dc5" FOREIGN KEY ("stake_pool_id") REFERENCES "stake_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "miner" ADD CONSTRAINT "FK_0284dfdd12d2bb6d6519561f4e1" FOREIGN KEY ("worker_id") REFERENCES "worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_81caea9d964ee3c0338fd44db4a" FOREIGN KEY ("stake_pool_id") REFERENCES "stake_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "worker" ADD CONSTRAINT "FK_adf8f5be7722a6cac072b470f10" FOREIGN KEY ("miner_id") REFERENCES "miner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "stake_pool_whitelist" ADD CONSTRAINT "FK_c07d6ab7536f049b3554ca40b8a" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "stake_pool_whitelist" ADD CONSTRAINT "FK_20a4bdc9d90cd0b746cf53e8971" FOREIGN KEY ("stake_pool_id") REFERENCES "stake_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "stake_pool" ADD CONSTRAINT "FK_9dc40c97caad68a3c0a6b9ee711" FOREIGN KEY ("owner_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "global_state"`)
    await db.query(`DROP TABLE "tokenomic_parameters"`)
    await db.query(`DROP TABLE "stake_pool_stake"`)
    await db.query(`DROP INDEX "public"."IDX_07bc33fb01c008a2251f20bdab"`)
    await db.query(`DROP INDEX "public"."IDX_5647459f5175b49a3eb5a53a43"`)
    await db.query(`DROP TABLE "miner"`)
    await db.query(`DROP INDEX "public"."IDX_737c656afd5d25141ddadb45dc"`)
    await db.query(`DROP INDEX "public"."IDX_0284dfdd12d2bb6d6519561f4e"`)
    await db.query(`DROP TABLE "worker"`)
    await db.query(`DROP INDEX "public"."IDX_81caea9d964ee3c0338fd44db4"`)
    await db.query(`DROP INDEX "public"."IDX_adf8f5be7722a6cac072b470f1"`)
    await db.query(`DROP TABLE "stake_pool_whitelist"`)
    await db.query(`DROP INDEX "public"."IDX_c07d6ab7536f049b3554ca40b8"`)
    await db.query(`DROP INDEX "public"."IDX_20a4bdc9d90cd0b746cf53e897"`)
    await db.query(`DROP TABLE "stake_pool"`)
    await db.query(`DROP INDEX "public"."IDX_c8c9190df77c9651929d6d23e2"`)
    await db.query(`DROP INDEX "public"."IDX_9dc40c97caad68a3c0a6b9ee71"`)
    await db.query(`DROP TABLE "account"`)
    await db.query(`ALTER TABLE "stake_pool_stake" DROP CONSTRAINT "FK_07bc33fb01c008a2251f20bdab2"`)
    await db.query(`ALTER TABLE "stake_pool_stake" DROP CONSTRAINT "FK_5647459f5175b49a3eb5a53a433"`)
    await db.query(`ALTER TABLE "miner" DROP CONSTRAINT "FK_737c656afd5d25141ddadb45dc5"`)
    await db.query(`ALTER TABLE "miner" DROP CONSTRAINT "FK_0284dfdd12d2bb6d6519561f4e1"`)
    await db.query(`ALTER TABLE "worker" DROP CONSTRAINT "FK_81caea9d964ee3c0338fd44db4a"`)
    await db.query(`ALTER TABLE "worker" DROP CONSTRAINT "FK_adf8f5be7722a6cac072b470f10"`)
    await db.query(`ALTER TABLE "stake_pool_whitelist" DROP CONSTRAINT "FK_c07d6ab7536f049b3554ca40b8a"`)
    await db.query(`ALTER TABLE "stake_pool_whitelist" DROP CONSTRAINT "FK_20a4bdc9d90cd0b746cf53e8971"`)
    await db.query(`ALTER TABLE "stake_pool" DROP CONSTRAINT "FK_9dc40c97caad68a3c0a6b9ee711"`)
  }
}
